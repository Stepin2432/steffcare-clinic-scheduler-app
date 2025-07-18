export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('🧠 User connected:', socket.id);

    // 1️⃣ Doctor joins their personal room
    socket.on('joinRoom', (doctorId) => {
      socket.join(doctorId);
      console.log(`🩺 Doctor joined room: ${doctorId}`);
    });

    // 2️⃣ When an appointment is booked, notify the specific doctor
    socket.on('bookAppointment', (data) => {
      const { doctorId } = data;

      // Emit only to the doctor's room
      io.to(doctorId).emit('newAppointment', data);

      console.log(`📅 Appointment sent to doctor room: ${doctorId}`);
    });

    // 3️⃣ Handle disconnect
    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
};

const updateQueue = (io, updatedQueue) => {
  io.to('reception').emit('queueUpdated', updatedQueue);

  // Optional: Send only to the specific doctor
  updatedQueue.forEach(patient => {
    io.to(patient.doctorId).emit('queueUpdated', updatedQueue.filter(p => p.doctorId === patient.doctorId));
  });
};
