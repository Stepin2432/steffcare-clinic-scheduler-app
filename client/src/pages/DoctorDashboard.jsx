import { useEffect } from 'react';
import { joinDoctorRoom } from '../socket';
import { useAuth } from '../context/AuthContext';
import AppointmentAlert from '../components/AppointmentAlert';
import DashboardLayout from '../components/layouts/DashboardLayout';

const DoctorDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'doctor') {
      joinDoctorRoom(user._id); // 👈 Join doctor room for real-time updates
    }
  }, [user]);

  return (
    <DashboardLayout>
      <AppointmentAlert />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Welcome, Dr. {user?.name}</h1>
        {/* ➕ Add doctor widgets or stats here */}
        <p className="text-gray-600">
          Here is your schedule and upcoming appointments.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
