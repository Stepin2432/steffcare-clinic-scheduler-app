// client/src/socket.js
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000'); // change to your deployed backend if needed

export const joinAdminRoom = () => {
  socket.emit('joinRoom', 'admin');
};

export const joinReceptionRoom = () => {
  socket.emit('joinRoom', 'reception');
};

export const joinDoctorRoom = (doctorId) => {
  socket.emit('joinRoom', doctorId);
};
