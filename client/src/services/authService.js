// src/services/authService.js

import axios from 'axios';

// Use your actual backend URL or environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

// Login user
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // should return { user, token }
};

// Logout user (optional - backend can handle token invalidation or just delete client-side token)
export const logoutUser = async () => {
  // If your backend supports logout (e.g., blacklisting tokens), you can call it
  try {
    await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (err) {
    // log if needed; logout is mostly client-side in JWT-based apps
    console.warn('Logout request failed:', err.message);
  }
};
