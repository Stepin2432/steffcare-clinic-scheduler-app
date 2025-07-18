// /client/src/pages/Dashboard.jsx

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import AppointmentAlert from '../components/AppointmentAlert';

const Dashboard = () => {
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    // ✅ Only doctors join their socket room after auth and socket ready
    if (user?.role === 'doctor' && socket) {
      socket.emit('joinRoom', { doctorId: user._id });
    }

    // Optional cleanup: leave room when component unmounts
    return () => {
      if (user?.role === 'doctor' && socket) {
        socket.emit('leaveRoom', { doctorId: user._id });
      }
    };
  }, [user, socket]);

  return (
    <div className="dashboard">
      <AppointmentAlert />
      <h1>Welcome, Dr. {user?.name}</h1>
      {/* Add additional dashboard widgets or stats */}
    </div>
  );
};

export default Dashboard;
