import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ links }) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-md h-full p-4">
      <h2 className="text-xl font-bold mb-4">Steffcare Medclinic</h2>
      <ul className="space-y-2">
        {links.map(link => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block px-3 py-2 rounded ${
                location.pathname === link.path ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-blue-100'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
