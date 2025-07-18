import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  type: { type: String, enum: ['consultation', 'emergency', 'surgery', 'recovery'], required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);
