import { useEffect } from 'react';
import { socket } from '../socket';
import AppointmentAlert from '../components/AppointmentAlert';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'admin') {
      socket.emit('joinRoom', 'admin');
    }
  }, [user]);

  return (
    <DashboardLayout>
      <AppointmentAlert />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.name}</h1>
        <p className="text-gray-600">
          You can manage doctors, rooms, view analytics, and oversee clinic activity here.
        </p>

        {/* 🔧 Add widgets below: */}
        <ul className="mt-4 list-disc pl-6 text-gray-700">
          <li>👨‍⚕️ Doctor & Specialization Management</li>
          <li>🧑‍🤝‍🧑 Patient overview & statistics</li>
          <li>📊 Revenue and appointment trends</li>
          <li>🏥 Room and resource tracking</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
