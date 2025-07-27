import { socket, joinReceptionRoom } from '../../socket';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AppointmentAlert from '../../components/AppointmentAlert';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const ReceptionDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'receptionist') {
      joinReceptionRoom(); // ✅
    }
  }, [user]);

  return (
    <DashboardLayout>
      <AppointmentAlert />
      
      {/* Welcome Message */}
      <div
        style={{
          backgroundColor: '#ffeb3b',
          padding: '2rem',
          borderRadius: '8px',
          marginTop: '1rem',
          color: '#d50000',
          fontWeight: 'bold',
          fontSize: '24px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        WELCOME RECEPTIONIST: {user?.name?.toUpperCase()}
      </div>

      {/* Reception Duties Overview */}
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center',
        }}
      >
        {/* Task 1: Manage Appointments */}
        <div
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            width: '300px',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          📅 Manage Appointments <br />
          <span style={{ fontWeight: 'normal', fontSize: '14px' }}>
            View, create, reschedule, and cancel appointments.
          </span>
        </div>

        {/* Task 2: Welcome Patients */}
        <div
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            width: '300px',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          👋 Welcome Patients <br />
          <span style={{ fontWeight: 'normal', fontSize: '14px' }}>
            Greet incoming patients and assist with check-ins.
          </span>
        </div>

        {/* Task 3: Coordinate with Doctors */}
        <div
          style={{
            backgroundColor: '#2196f3',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            width: '300px',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          🤝 Coordinate with Doctors <br />
          <span style={{ fontWeight: 'normal', fontSize: '14px' }}>
            Communicate room availability and patient status.
          </span>
        </div>

        {/* Task 4: Notifications */}
        <div
          style={{
            backgroundColor: '#ff9800',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '10px',
            width: '300px',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          🔔 Real-Time Notifications <br />
          <span style={{ fontWeight: 'normal', fontSize: '14px' }}>
            Stay updated on appointment changes and alerts.
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceptionDashboard;
