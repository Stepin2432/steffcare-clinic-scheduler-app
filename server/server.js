import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import connectDB from './config/db.js';
import { socketHandler } from './socket/socketHandler.js';

import appointmentRoutes from './routes/appointments.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

// ✅ Init app
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// ✅ Middlewares
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ✅ API Test
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// ✅ Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);

// ✅ Create HTTP server & Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

app.set('io', io);
socketHandler(io);

// ✅ Start Server with DB connection
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server failed to start:', err.message);
    process.exit(1);
  }
};

startServer();
