import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// 🔐 Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    console.log('📥 Request body:', req.body);
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      location,
      country,
      county,
    } = req.body;

    // ❗ Ensure all required fields are present
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2️⃣ Password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // 3️⃣ Handle profile picture if uploaded
    let profilePic = null;
    if (req.file) {
      profilePic = req.file.buffer.toString('base64');
    }

    // 4️⃣ Create new user
    const user = await User.create({
      name,
      email,
      password,
      role,
      location,
      country,
      county,
      profilePic,
    });

    // 5️⃣ Respond with token and user
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        country: user.country,
        county: user.county,
        profilePic: user.profilePic,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('❌ Register error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2️⃣ Check if password is correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3️⃣ Return success response
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        country: user.country,
        county: user.county,
        profilePic: user.profilePic,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};
