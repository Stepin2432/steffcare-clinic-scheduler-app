import mongoose from 'mongoose';

const specializationSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Specialization', specializationSchema);
