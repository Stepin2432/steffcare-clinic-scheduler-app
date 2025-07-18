import { useEffect } from 'react';
import { socket } from '../socket';
import AppointmentAlert from '../components/AppointmentAlert';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';

const ReceptionDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Join a general "reception" room
    if (user?.role === 'receptionist') {
      socket.emit('joinRoom', 'reception');
    }
  }, [user]);

  return (
    <DashboardLayout>
      <AppointmentAlert />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.name}</h1>
        <p className="text-gray-600">
          Here you can manage patient bookings, view today's appointments, and check availability.
        </p>
        {/* ➕ Add calendar, patient queue, or appointment creation here */}
      </div>
    </DashboardLayout>
  );
};

export default ReceptionDashboard;
