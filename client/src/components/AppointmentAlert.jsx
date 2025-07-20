import { useEffect, useState } from 'react';
import { socket } from '../socket';

const AppointmentAlert = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const handleNewAppointment = (data) => {
      setAlert(`📅 New Appointment: ${data.patientName} with Dr. ${data.doctorName}`);
      setTimeout(() => setAlert(null), 5000); // Auto-hide after 5s
    };

    socket.on('new-appointment', handleNewAppointment);

    return () => {
      socket.off('new-appointment', handleNewAppointment);
    };
  }, []);

  if (!alert) return null;

  return (
    <div className="bg-green-100 text-green-800 p-2 px-4 rounded mb-4 shadow">
      {alert}
    </div>
  );
};

export default AppointmentAlert;
