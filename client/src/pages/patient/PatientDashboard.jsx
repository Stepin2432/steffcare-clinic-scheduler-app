import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import PatientAppointmentsTable from '../../components/tables/PatientAppointmentsTable';
import PrescriptionsTable from '../../components/tables/PrescriptionsTable';

const links = [
  { path: '/patient', label: 'Dashboard' },
  { path: '/patient/appointments', label: 'Appointments' },
  { path: '/patient/prescriptions', label: 'Prescriptions' }
];

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout links={links}>
      <h1 className="text-xl font-semibold mb-4">Welcome, {user?.name}</h1>
      <PatientAppointmentsTable />
      <PrescriptionsTable />
    </DashboardLayout>
  );
};

export default PatientDashboard;
