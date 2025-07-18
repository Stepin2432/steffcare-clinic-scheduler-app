// src/components/AppointmentAlert.jsx
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

const AppointmentAlert = () => {
  const socket = useSocket();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleNewAppointment = (data) => {
      setAppointment(data);

      // Auto-dismiss alert after 5 seconds
      const timeoutId = setTimeout(() => {
        setAppointment(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    };

    socket.on('newAppointment', handleNewAppointment);

    return () => {
      socket.off('newAppointment', handleNewAppointment);
    };
  }, [socket]);

  if (!appointment) return null;

  return (
    <div className="bg-green-500 text-white text-center py-3 px-5 rounded shadow-md mb-4 animate-bounce">
      📅 New appointment booked with Dr.{' '}
      <strong>{appointment.doctorName}</strong> at{' '}
      <strong>{appointment.time}</strong>
    </div>
  );
};

export default AppointmentAlert;
