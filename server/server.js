import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { socketHandler } from './utils/socket.js'; // ✅ import handler

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // adjust in production
  },
});

// ✅ Initialize sockets
socketHandler(io);

// Other Express app setup (middlewares, routes...)

server.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});

