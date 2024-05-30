import { server, WEB_SOCKET_SERVER } from './app';
import mongoose from 'mongoose';
import { amqpInstance } from '@codishrohan/common';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';

const rooms: any = {};
const initialSocket: any = {};

const CONNECT_DB = async () => {
  await amqpInstance.connect();
  await mongoose.connect(
    'mongodb+srv://rohantiwari:rohantiwari@auth.pq34qjc.mongodb.net/?retryWrites=true&w=majority'
  );
};

CONNECT_DB()
  .then(async () => {
    console.log('Connected to AUTH MongoDB');
    server.listen(3000, async () => {
      console.log('Auth service started at port 3000');
    });
  })
  .catch((err) => console.log(err));

WEB_SOCKET_SERVER.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  if (request.cookies[0]?.value) {
    const decoded = jwt.verify(
      request.cookies[0].value,
      process.env.JWT_KEY!
    ) as jwt.JwtPayload;
    initialSocket[decoded.id] = connection;
  } else {
    connection.close();
  }
  console.log('Connection Accepted');

  connection.on('message', (message) => {
    try {
      const MSG = JSON.parse((message as any).utf8Data);
      const { type, targetID } = MSG;
      if (type === 'CREATE_ROOM') {
        const ROOM_ID = randomUUID().substring(0, 5);
        rooms[ROOM_ID] = { members: [] };
        rooms[ROOM_ID].members.push({
          socket: connection,
          jwt: request.cookies[0].value,
        });

        connection.send(JSON.stringify({ type: 'ROOM_CREATED', ROOM_ID }));
        if (initialSocket[targetID]) {
          rooms[ROOM_ID].members.push({
            socket: initialSocket[targetID],
            jwt: request.cookies[0].value,
          });
          initialSocket[targetID].send(
            JSON.stringify({ type: 'JOINED_ROOM', ROOM_ID })
          );
        }
      }

      if (type === 'JOIN_ROOM') {
        const { ROOM_ID } = MSG;
        if (!(ROOM_ID in rooms)) return;
        rooms[ROOM_ID].members.push({
          socket: connection,
          jwt: request.cookies[0].value,
        });
        connection.send(JSON.stringify({ type: 'JOINED_ROOM', ROOM_ID }));
      }

      if (type === 'MESSAGE') {
        const { ROOM_ID, message } = MSG;
        // (rooms[ROOM_ID]?.members[0] as WebSocket).send(
        //   JSON.stringify({ type: 'MESSAGE', message, role: 'SENDER' })
        // );
        // (rooms[ROOM_ID]?.members[1] as WebSocket).send(
        //   JSON.stringify({ type: 'MESSAGE', message, role: 'RECEIVER' })
        // );
        rooms?.[ROOM_ID]?.members.forEach((member: any) => {
          const { jwt, socket } = member;
          if (jwt === request.cookies[0].value) {
            socket.send(
              JSON.stringify({ type: 'MESSAGE', message, role: 'SENDER' })
            );
          } else {
            socket.send(
              JSON.stringify({ type: 'MESSAGE', message, role: 'RECEIVER' })
            );
          }
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  });

  connection.on('close', () => {
    Object.keys(rooms).forEach((roomID) => {
      rooms[roomID].members = rooms[roomID].members.filter(
        (member: any) => member.socket !== connection
      );
      if (rooms[roomID].members.length === 0) {
        delete rooms[roomID];
      }
    });
    console.log('Connection Closed');
  });
});
