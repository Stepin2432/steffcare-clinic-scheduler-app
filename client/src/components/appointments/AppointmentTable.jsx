import AppointmentTable from '../components/appointments/AppointmentTable';
import { useAppointments } from '../hooks/useAppointments'; // Assuming custom hook for fetching data

const DailySchedule = () => {
  const { appointments, loading } = useAppointments();

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Today's Appointments</h2>
      {loading ? <p>Loading...</p> : <AppointmentTable appointments={appointments} />}
    </div>
  );
};

