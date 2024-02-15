import express from 'express';
import { AuthRoute } from './Routes/Auth-Route';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@codishrohan/common';
import ws from 'websocket';
import http from 'http';
const app = express();
const server = http.createServer(app);

const WEB_SOCKET_SERVER = new ws.server({
  httpServer: server,
  autoAcceptConnections: false,
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', AuthRoute);
app.use(errorHandler);

export { server, WEB_SOCKET_SERVER };
