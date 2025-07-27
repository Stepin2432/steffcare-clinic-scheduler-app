import { useState, useEffect } from 'react';
import {
  LuCalendarCheck,
  LuClock,
  LuBadgeCheck,
  LuTrash2,
} from 'react-icons/lu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { socket } from '../../socket';

const PatientAppointmentsTable = ({ searchTerm = '' }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();

    socket.on('appointmentStatusUpdated', (updated) => {
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === updated._id ? updated : appt))
      );
    });

    return () => {
      socket.off('appointmentStatusUpdated');
    };
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/api/appointments/patient');
      setAppointments(res.data);
    } catch (err) {
      toast.error('Failed to load appointments.');
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await axios.patch(`/api/appointments/${id}/cancel`);
      toast.success('Appointment canceled');
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? res.data : appt))
      );
      socket.emit('appointmentCanceled', res.data);
    } catch (err) {
      toast.error('Failed to cancel appointment');
    }
  };

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

  const filtered = appointments.filter((a) =>
    a.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <h2 className="text-xl mb-3 flex items-center gap-2 font-semibold">
        <LuCalendarCheck size={20} /> Upcoming Appointments
      </h2>

      {filtered.length === 0 ? (
        <div className="text-gray-500 text-center mt-4">
          No appointments found.
        </div>
      ) : (
        filtered.map((appt) => (
          <div
            key={appt._id}
            className="flex flex-col bg-slate-50 p-4 mb-4 rounded-xl shadow-sm"
          >
            <div className="flex flex-wrap justify-between gap-y-2">
              <div>
                <strong>Doctor:</strong> {appt.doctor?.name}
              </div>
              <div className="flex items-center gap-1">
                <LuClock size={16} />
                {appt.time}
              </div>
              <div>
                <strong>Date:</strong> {appt.date}
                {isTomorrow(appt.date) && (
                  <span className="bg-yellow-300 text-yellow-900 text-xs ml-2 px-2 py-1 rounded-full">
                    Tomorrow
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <LuBadgeCheck size={16} />
                <span
                  className={`font-medium ${
                    appt.status === 'approved'
                      ? 'text-green-600'
                      : appt.status === 'pending'
                      ? 'text-orange-500'
                      : 'text-red-500'
                  }`}
                >
                  {appt.status}
                </span>
              </div>

              {appt.status === 'pending' && (
                <button
                  onClick={() => handleCancel(appt._id)}
                  className="ml-auto mt-2 text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                >
                  <LuTrash2 size={16} /> Cancel
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientAppointmentsTable;
