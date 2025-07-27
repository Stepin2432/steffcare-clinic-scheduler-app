import {
  Home,
  Calendar,
  ClipboardList,
  Users,
  Settings,
  Stethoscope,
  Bed,
  FileText,
  LayoutDashboard,
} from 'lucide-react';

const linksByRole = {
  admin: [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <Home size={18} /> },
    { name: 'Doctors', path: '/admin/doctors', icon: <Stethoscope size={18} /> },
    { name: 'Patients', path: '/admin/patients', icon: <Users size={18} /> },
    { name: 'Appointments', path: '/admin/appointments', icon: <Calendar size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ],
  doctor: [
    { name: 'Dashboard', path: '/doctor/dashboard', icon: <Home size={18} /> },
    { name: 'Appointments', path: '/doctor/appointments', icon: <Calendar size={18} /> },
    { name: 'Prescriptions', path: '/doctor/prescriptions', icon: <ClipboardList size={18} /> },
    { name: 'Settings', path: '/doctor/settings', icon: <Settings size={18} /> },
  ],
  receptionist: [
    { name: 'Dashboard', path: '/reception/dashboard', icon: <Home size={18} /> },
    { name: 'Appointments', path: '/reception/appointments', icon: <Calendar size={18} /> },
    { name: 'Rooms', path: '/reception/rooms', icon: <Bed size={18} /> },
    { name: 'Patients', path: '/reception/patients', icon: <Users size={18} /> },
    { name: 'Settings', path: '/reception/settings', icon: <Settings size={18} /> },
  ],
  patient: [
    { name: 'Dashboard', path: '/patient/dashboard', icon: <Home size={18} /> },
    { name: 'My Appointments', path: '/patient/appointments', icon: <Calendar size={18} /> },
    { name: 'Prescriptions', path: '/patient/prescriptions', icon: <FileText size={18} /> },
    { name: 'Settings', path: '/patient/settings', icon: <Settings size={18} /> },
  ],
};

export const getSidebarLinks = (role) => {
  return linksByRole[role] || [];
};
