import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // 🔄 Switched to bcryptjs for wider compatibility

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['admin', 'doctor', 'receptionist', 'patient'],
      default: 'patient',
    },

    // ✅ Additional fields
    location: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    county: {
      type: String,
      trim: true,
    },

    profilePic: {
      type: String, // base64 string or image URL
    },
  },
  { timestamps: true }
);

// 🔒 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔐 Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
