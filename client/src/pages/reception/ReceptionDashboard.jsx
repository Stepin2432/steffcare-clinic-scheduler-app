import { socket, joinReceptionRoom } from '../../socket';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AppointmentAlert from '../../components/AppointmentAlert';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const ReceptionDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'receptionist') {
      joinReceptionRoom(); // ✅
    }
  }, [user]);

  return (
    <DashboardLayout>
      <AppointmentAlert />
      <h1>Welcome Receptionist: {user?.name}</h1>
    </DashboardLayout>
  );
};

export default ReceptionDashboard;
