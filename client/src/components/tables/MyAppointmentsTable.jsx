import { useEffect, useState } from 'react';
import axios from '../../services/api';

const MyAppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/appointments/mine');
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-2">Today's Appointments</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id}>
              <td>{appt.patient?.name}</td>
              <td>{new Date(appt.date).toLocaleTimeString()}</td>
              <td>{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointmentsTable;
