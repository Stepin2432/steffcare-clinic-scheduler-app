// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, UserCircle } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const { user } = useAuth();

  const navItems = {
    admin: [
      { label: 'Dashboard', path: '/admin' },
      { label: 'Doctors', path: '/admin/doctors' },
      { label: 'Patients', path: '/admin/patients' },
      { label: 'Appointments', path: '/admin/appointments' },
    ],
    receptionist: [
      { label: 'Dashboard', path: '/reception' },
      { label: 'Appointments', path: '/reception/appointments' },
      { label: 'Patients', path: '/reception/patients' },
    ],
    doctor: [
      { label: 'Dashboard', path: '/doctor' },
      { label: 'Appointments', path: '/doctor/appointments' },
      { label: 'Prescriptions', path: '/doctor/prescriptions' },
    ],
    patient: [
      { label: 'Dashboard', path: '/patient' },
      { label: 'Appointments', path: '/patient/appointments' },
      { label: 'Prescriptions', path: '/patient/prescriptions' },
    ]
  };

  const items = navItems[user?.role] || [];

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-green-600">Steffcare</h2>
        <nav className="space-y-2">
          {items.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t pt-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2 mb-3">
          <UserCircle className="w-5 h-5" />
          {user?.name || 'User'} ({user?.role})
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
