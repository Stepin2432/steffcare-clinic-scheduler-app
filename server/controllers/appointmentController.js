// controllers/appointmentController.js
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, time } = req.body;

    const newAppointment = await Appointment.create({
      doctorId,
      patientId,
      date,
      time,
      status: 'Pending',
    });

    // ✅ Emit event to doctor's room
    const io = req.app.get('io');
    io.to(doctorId).emit('newAppointment', {
      appointmentId: newAppointment._id,
      patientId,
      date,
      time,
    });

    res.status(201).json({ message: 'Appointment created', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create appointment', error });
  }
};
