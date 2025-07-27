import { CalendarDays, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import PatientAppointmentsTable from '../../components/tables/PatientAppointmentsTable';
import { getSidebarLinks } from '../../data/sidebarLinks';
import { useState } from 'react';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) return null;

  return (
    <DashboardLayout links={patientSidebarLinks}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Welcome, {user.name}
          </h2>
          <CalendarDays className="text-blue-500" size={32} />
        </div>

        <div className="flex items-center gap-2">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div className="mt-4">
          <PatientAppointmentsTable searchTerm={searchTerm} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
