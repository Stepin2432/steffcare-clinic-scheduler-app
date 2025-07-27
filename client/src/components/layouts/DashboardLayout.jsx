import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Menu, Sun, Moon, UserCircle } from 'lucide-react';
import { getSidebarLinks } from '../../data/sidebarLinks';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const sidebarLinks = getSidebarLinks(user?.role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className={`flex min-h-screen transition-all ${
        darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col justify-between transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-16'} 
          bg-gray-800 text-white dark:bg-gray-900`}
      >
        {/* Brand/Logo */}
        <div className="p-4 text-center font-bold text-lg bg-gray-900 dark:bg-gray-950">
          {sidebarOpen ? 'Steffcare' : 'S'}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1 overflow-auto">
          {sidebarLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                to={link.path}
                key={idx}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all text-sm
                  ${isActive ? 'bg-blue-600 font-semibold' : 'hover:bg-gray-700'}
                  ${sidebarOpen ? '' : 'justify-center'}`}
              >
                <span>{link.icon}</span>
                {sidebarOpen && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer with user info & logout */}
        <div className="border-t border-gray-700 p-4 flex flex-col gap-3">
          {sidebarOpen && (
            <div className="flex items-center gap-2 text-sm">
              <UserCircle size={20} />
              <span>{user?.name}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center text-red-400 text-sm hover:text-red-600 transition gap-2"
          >
            <LogOut size={18} />
            {sidebarOpen && 'Logout'}
          </button>
        </div>

        {/* Sidebar Toggle */}
        <div className="absolute top-4 right-[-0.75rem]">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="w-6 h-6 bg-gray-700 text-white rounded-full shadow hover:bg-gray-600"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="absolute bottom-4 right-[-0.75rem]">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="w-6 h-6 bg-gray-700 text-white rounded-full shadow hover:bg-gray-600"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 overflow-y-auto transition-all">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
