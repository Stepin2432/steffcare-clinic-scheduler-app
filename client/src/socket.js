// src/socket.js

import { io } from 'socket.io-client';

// ✅ Backend URL (adjust if deployed)
export const socket = io('http://localhost:5000', {
  transports: ['websocket'], // Or use ['websocket', 'polling'] if needed
  withCredentials: true,     // Allow cookies and auth headers
});

// ✅ Join Admin room
export const joinAdminRoom = () => {
  socket.emit('joinRoom', 'admin');
};

// ✅ Join Receptionist room
export const joinReceptionRoom = () => {
  socket.emit('joinRoom', 'reception');
};

// ✅ Join Doctor-specific room
export const joinDoctorRoom = (doctorId) => {
  if (doctorId) {
    socket.emit('joinRoom', doctorId);
  }
};
