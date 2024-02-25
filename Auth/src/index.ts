import { server, WEB_SOCKET_SERVER } from './app';
import mongoose from 'mongoose';
import { amqpInstance } from '@codishrohan/common';

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

const Rooms: { [key: string]: any } = {};

WEB_SOCKET_SERVER.on('request', (request) => {
  console.log('Request');
  const connection = request.accept(null, request.origin);
  connection.on('message', (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === 'CREATE_ROOM') {
      const random_uuid = crypto.randomUUID();
      Rooms[random_uuid] = [connection];
      connection &&
        connection.send(
          JSON.stringify({ type: 'ROOM_CREATED', payload: random_uuid })
        );
    }

    if (parsedMessage.type === 'JOIN_ROOM') {
      const { roomId } = parsedMessage.payload;
      const socket = Rooms[roomId];
      if (socket) {
        Rooms[roomId] = [...socket, connection];
        return (
          connection && connection.send(JSON.stringify({ type: 'JOINED' }))
        );
      } else {
        return (
          connection && connection.send(JSON.stringify({ type: 'NOT_FOUND' }))
        );
      }
    }

    if (parsedMessage.type === 'SEND_MESSAGE') {
      const { roomId, message } = parsedMessage.payload;
      const socket = Rooms[roomId];
      if (socket) {
        socket.forEach((s: any) => {
          s.send(JSON.stringify({ type: 'MESSAGE', payload: message }));
        });
      }
    }
  });
});
