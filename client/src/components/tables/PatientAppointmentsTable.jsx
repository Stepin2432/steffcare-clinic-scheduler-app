import { useEffect, useState } from 'react';
import { getAppointmentsByPatient } from '../../services/api';

const PatientAppointmentsTable = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAppointmentsByPatient(patientId);
      setAppointments(data);
    };
    fetchAppointments();
  }, [patientId]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr key={apt._id}>
              <td>{apt.date}</td>
              <td>{apt.time}</td>
              <td>{apt.doctorName}</td>
              <td>{apt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientAppointmentsTable;
