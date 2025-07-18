// Role constants
export const USER_ROLES = ['doctor', 'patient', 'admin'];

export const defaultUser = {
  _id: '',
  name: '',
  email: '',
  role: 'patient',
};

export const defaultAppointment = {
  _id: '',
  patientId: '',
  doctorId: '',
  date: '',
  time: '',
  status: 'pending',
  roomId: '',
};

export const defaultRoom = {
  _id: '',
  number: '',
  type: '',
  isAvailable: true,
};

export const defaultPrescription = {
  _id: '',
  doctorId: '',
  patientId: '',
  medication: '',
  instructions: '',
  issuedAt: '',
};

export const defaultSpecialization = {
  _id: '',
  doctorId: '',
  specialization: '',
};
