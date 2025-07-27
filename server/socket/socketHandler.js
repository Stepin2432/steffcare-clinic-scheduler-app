// backend/socket.js

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('🧠 User connected:', socket.id);

    // 1️⃣ Join a room (doctor, admin, reception, etc.)
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`✅ User joined room: ${roomId}`);
    });

    // 2️⃣ Notify doctor when appointment is booked
    socket.on('bookAppointment', (data) => {
      const { doctorId } = data;
      io.to(doctorId).emit('newAppointment', data);
      console.log(`📅 Appointment sent to doctor room: ${doctorId}`);
    });

    // 3️⃣ Notify doctor when appointment is canceled
    socket.on('appointmentCanceled', (data) => {
      const { doctorId } = data;
      io.to(doctorId).emit('appointmentStatusUpdated', data);
      console.log(`❌ Appointment canceled. Notified doctor ${doctorId}`);
    });

    // 4️⃣ Handle disconnection
    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
};

// 🔄 Optional: Emit updated queue to reception + doctors
export const updateQueue = (io, updatedQueue) => {
  io.to('reception').emit('queueUpdated', updatedQueue);

  updatedQueue.forEach((patient) => {
    io.to(patient.doctorId).emit(
      'queueUpdated',
      updatedQueue.filter((p) => p.doctorId === patient.doctorId)
    );
  });
};
