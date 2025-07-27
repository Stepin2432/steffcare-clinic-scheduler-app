import express from 'express';
import multer from 'multer';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

// ⬇️ Multer setup
const storage = multer.memoryStorage(); // or diskStorage if needed
const upload = multer({ storage });

// ✅ Use multer middleware on register
router.post('/register', upload.single('profilePic'), registerUser);
router.post('/login', loginUser);

export default router;
