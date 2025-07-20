import { useEffect } from 'react';
import { socket, joinDoctorRoom } from '../../socket';// ✅ import
import { useAuth } from '../../context/AuthContext';
import AppointmentAlert from '../../components/AppointmentAlert';
import DashboardLayout from '../../components/layouts/DashboardLayout';



const DoctorDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'doctor') {
      joinDoctorRoom(user._id); // ✅ use doctor's ID
    }
  }, [user]);

  return (
    <DashboardLayout>
      <AppointmentAlert />
      <h1>Welcome Dr. {user?.name}</h1>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
