import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medication: { type: String, required: true },
  instructions: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Prescription', prescriptionSchema);
