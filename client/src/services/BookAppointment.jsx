import socket from '../utils/socket';

const handleBooking = async () => {
  const newAppt = {
    patientName: 'Stephen Machaki',
    date: '2025-07-20',
    status: 'pending'
  };

  await axios.post('/api/appointments', newAppt);
  socket.emit('bookAppointment', newAppt);
};

