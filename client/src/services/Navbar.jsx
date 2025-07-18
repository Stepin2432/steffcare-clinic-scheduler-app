import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const commonLinks = (
    <>
      <Link to="/" className="hover:text-blue-500">Home</Link>
      <Link to="/appointments" className="hover:text-blue-500">Appointments</Link>
    </>
  );

  const roleLinks = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
            <Link to="/admin/doctors">Manage Doctors</Link>
            <Link to="/admin/rooms">Manage Rooms</Link>
            <Link to="/admin/specializations">Specializations</Link>
          </>
        );
      case 'doctor':
        return (
          <>
            <Link to="/doctor/dashboard">My Dashboard</Link>
            <Link to="/doctor/schedule">My Schedule</Link>
            <Link to="/doctor/patients">My Patients</Link>
          </>
        );
      case 'receptionist':
        return (
          <>
            <Link to="/reception/dashboard">Reception Dashboard</Link>
            <Link to="/reception/queue">Patient Queue</Link>
          </>
        );
      case 'patient':
        return (
          <>
            <Link to="/patient/dashboard">Patient Dashboard</Link>
            <Link to="/patient/appointments">My Appointments</Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <div className="flex space-x-4 text-sm font-medium">
        {commonLinks}
        {user && roleLinks()}
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
