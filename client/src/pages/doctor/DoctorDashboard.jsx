import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { socket, joinDoctorRoom } from '../../socket';
import AppointmentAlert from '../../components/AppointmentAlert';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import DoctorAppointmentsTable from '../../components/tables/DoctorAppointmentsTable';
import PrescriptionsTable from '../../components/tables/PrescriptionsTable';

const DoctorDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'doctor') {
      joinDoctorRoom(user._id);
    }
  }, [user]);

  if (!user || user.role !== 'doctor') {
    return (
      <DashboardLayout>
        <div
          style={{
            padding: '1.5rem',
            textAlign: 'center',
            fontSize: '1.125rem',
            color: '#dc2626',
          }}
        >
          Unauthorized or loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#f0f9ff',
          minHeight: '100vh',
          borderRadius: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          overflowX: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <AppointmentAlert />

        {/* Welcome Message */}
        <div
          style={{
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            padding: '1rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          Welcome Dr. {user.name}
        </div>

        {/* Doctor Profile Info */}
        <section
          style={{
            backgroundColor: '#fef9c3',
            padding: '1rem',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            color: '#78350f',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            👨‍⚕️ Doctor Profile
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', lineHeight: '1.75' }}>
            <li><strong>Name:</strong> Dr. {user.name}</li>
            <li><strong>Specialization:</strong> {user.specialization || 'General Practitioner'}</li>
            <li><strong>Education:</strong> {user.education || 'MBChB, University of Nairobi'}</li>
            <li><strong>Experience:</strong> {user.experience || '5+ years in clinical practice'}</li>
            <li><strong>Email:</strong> {user.email || 'steffie.kmachaki50@gmail.com'}</li>
            <li><strong>Contact:</strong> {user.phone || '+254 704 980 559'}</li>
          </ul>
        </section>

        {/* Appointments Section */}
        <section
          style={{
            backgroundColor: '#ffffff',
            padding: '1rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 5px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
            }}
          >
            📅 Today's Appointments
          </h2>
          <DoctorAppointmentsTable doctorId={user._id} />
        </section>

        {/* Prescriptions Section */}
        <section
          style={{
            backgroundColor: '#ffffff',
            padding: '1rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 5px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
            }}
          >
            💊 Recent Prescriptions
          </h2>
          <PrescriptionsTable doctorId={user._id} />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
