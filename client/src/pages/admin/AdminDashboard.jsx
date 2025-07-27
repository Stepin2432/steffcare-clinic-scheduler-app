import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

function AdminDashboard() {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHighlight(prev => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { title: 'Doctors', count: 12 },
    { title: 'Patients', count: 54 },
    { title: 'Appointments', count: 27 },
    { title: 'Rooms', count: 8 }
  ];

  const links = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/doctors', label: 'Doctors' },
    { path: '/admin/patients', label: 'Patients' },
    { path: '/admin/appointments', label: 'Appointments' },
    { path: '/admin/rooms', label: 'Rooms' }
  ];

  return (
    <DashboardLayout links={links}>
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#eef2f7',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: highlight ? '#1e3a8a' : '#1f2937',
            transition: 'color 0.5s',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          Steffcare Medclinic Admin Dashboard
        </h1>

        <p
          style={{
            color: '#374151',
            fontSize: '1.1rem',
            textAlign: 'center',
            marginBottom: '2rem',
            maxWidth: '600px',
            lineHeight: '1.6',
          }}
        >
          Monitor, manage, and improve the clinic's efficiency. Use the sidebar to explore doctors, patients, appointments, and rooms.
        </p>

        {/* Stat Cards */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            maxWidth: '1000px',
            width: '100%',
            marginBottom: '2rem',
          }}
        >
          {stats.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                minWidth: '220px',
                maxWidth: '240px',
                flex: '1 1 220px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <h3
                style={{
                  fontSize: '1.3rem',
                  color: '#111827',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: '2.2rem',
                  fontWeight: '700',
                  color: '#3b82f6',
                }}
              >
                {item.count}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: '1rem',
            color: '#6b7280',
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          Easily add or update doctors, patients, and room info from the respective sections.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
