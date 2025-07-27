// server/routes/appointments.js
import express from 'express';
const router = express.Router();

// Example GET route
router.get('/', (req, res) => {
  res.json({ message: 'Appointments endpoint working!' });
});

export default router;
