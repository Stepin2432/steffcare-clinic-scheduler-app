// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSidebarLinks } from '../data/sidebarLinks';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const links = getSidebarLinks(user?.role);

  return (
    <aside className="w-64 bg-white h-screen shadow-md flex flex-col justify-between">
      <nav className="p-4 flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all ${
                isActive
                  ? 'bg-blue-500 text-white font-semibold'
                  : 'text-gray-700 hover:bg-blue-100'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t">
        <div className="text-sm text-gray-600 mb-2">
          Signed in as <span className="font-medium">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          className="text-red-600 text-sm hover:underline hover:text-red-800"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
