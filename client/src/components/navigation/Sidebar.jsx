import { NavLink } from 'react-router-dom';

const Sidebar = ({ links }) => {
  return (
    <aside
      style={{
        width: '16rem', // 64 tailwind units
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: '100vh',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            style={({ isActive }) => ({
              padding: '0.5rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              color: isActive ? '#1e3a8a' : '#374151',
              backgroundColor: isActive ? '#bfdbfe' : 'transparent',
              fontWeight: isActive ? 'bold' : 'normal',
              marginBottom: '0.25rem',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
