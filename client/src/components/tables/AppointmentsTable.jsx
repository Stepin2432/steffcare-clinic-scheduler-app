import { useState, useEffect } from 'react';
import { LuCalendarCheck, LuClock, LuBadgeCheck } from 'react-icons/lu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { socket } from '../../../socket';
import { useAuth } from '../../context/AuthContext';

const dummyAppointments = [
  {
    id: 1,
    date: '2025-07-23',
    time: '10:00 AM',
    doctor: 'Dr. Jane Smith',
    status: 'Confirmed',
  },
  {
    id: 2,
    date: '2025-07-24',
    time: '2:00 PM',
    doctor: 'Dr. John Doe',
    status: 'Pending',
  },
];

const isTomorrow = (dateStr) => {
  const appointmentDate = new Date(dateStr);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    appointmentDate.getDate() === tomorrow.getDate() &&
    appointmentDate.getMonth() === tomorrow.getMonth() &&
    appointmentDate.getFullYear() === tomorrow.getFullYear()
  );
};

const PatientAppointmentsTable = ({ searchTerm = '' }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(dummyAppointments);
  }, []);

  const filtered = appointments.filter((a) =>
    a.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <LuCalendarCheck size={20} /> Upcoming Appointments
      </h2>

      {filtered.map((appt) => (
        <div
          key={appt.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8fafc',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: '0.5rem',
            }}
          >
            <div>
              <strong>Doctor:</strong> {appt.doctor}
            </div>
            <div>
              <LuClock size={16} style={{ marginRight: '0.25rem' }} />
              {appt.time}
            </div>
            <div>
              <strong>Date:</strong> {appt.date}{' '}
              {isTomorrow(appt.date) && (
                <span
                  style={{
                    backgroundColor: '#facc15',
                    color: '#92400e',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    marginLeft: '0.5rem',
                  }}
                >
                  Tomorrow
                </span>
              )}
            </div>
            <div>
              <LuBadgeCheck size={16} style={{ marginRight: '0.25rem' }} />
              <span
                style={{
                  color: appt.status === 'Confirmed' ? '#16a34a' : '#d97706',
                  fontWeight: '500',
                }}
              >
                {appt.status}
              </span>
            </div>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{ color: '#6b7280', textAlign: 'center' }}>No appointments found.</div>
      )}
    </div>
  );
};

export default PatientAppointmentsTable;
