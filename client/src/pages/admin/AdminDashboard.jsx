// client/src/pages/AdminDashboard.jsx
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { socket, joinAdminRoom } from '../../socket'; // ✅
import DashboardLayout from '../../components/layouts/DashboardLayout';
import DoctorsTable from '../../components/tables/DoctorsTable';
import AppointmentsTable from '../../components/tables/AppointmentsTable';
import PatientsTable from '../../components/tables/PatientsTable';

const links = [
  { path: '/admin', label: 'Dashboard' },
  { path: '/admin/doctors', label: 'Doctors' },
  { path: '/admin/appointments', label: 'Appointments' },
  { path: '/admin/patients', label: 'Patients' },
];

const AdminDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'admin') {
      joinAdminRoom();
    }
  }, [user]);

  return (
    <DashboardLayout links={links}>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <DoctorsTable />
      <AppointmentsTable />
    </DashboardLayout>
  );
};

export default AdminDashboard;
