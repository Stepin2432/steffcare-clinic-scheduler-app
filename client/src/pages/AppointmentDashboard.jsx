import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Receive real-time updates
    socket.on('newAppointment', (newAppt) => {
      setAppointments(prev => [...prev, newAppt]);
      alert("New appointment booked!");
    });

    // Clean up
    return () => {
      socket.off('newAppointment');
    };
  }, []);

  return (
    <div>
      <h2>Live Appointments</h2>
      {appointments.map((appt, i) => (
        <div key={i}>
          <p><strong>Patient:</strong> {appt.patientName}</p>
          <p><strong>Date:</strong> {appt.date}</p>
          <p><strong>Status:</strong> {appt.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentDashboard;
