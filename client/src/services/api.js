import axios from 'axios';

// Create a configured Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Attach token from localStorage to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Named export for getAppointmentsByPatient using the shared API instance
export const getAppointmentsByPatient = async (patientId) => {
  try {
    const response = await API.get(`/appointments/patient/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    throw error;
  }
};

// Optional: still export API instance if you need it elsewhere
export default API;
