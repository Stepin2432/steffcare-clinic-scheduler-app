import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Server } from 'socket.io';
import { socketHandler } from './utils/socket.js';

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Change to frontend URL later
  },
});

socketHandler(io);

server.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
