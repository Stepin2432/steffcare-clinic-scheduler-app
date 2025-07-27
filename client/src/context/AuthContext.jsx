// client/src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 🔁 Sync axios token with current login
  useEffect(() => {
    const token =
      localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // ✅ Register with optional profilePic
  const register = async ({
    name,
    email,
    password,
    confirmPassword,
    role = 'patient',
    profilePicFile,
  }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('role', role);
      if (profilePicFile) {
        formData.append('profilePic', profilePicFile);
      }

      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const userData = res.data.user || res.data;
      const token = res.data.token;

      setUser(userData);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed';
      console.error('❌ Register error:', message);
      throw new Error(message);
    }
  };

  // ✅ Login with Remember Me support
  const login = async (email, password, remember = true) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );

      const userData = res.data.user || res.data;
      const token = res.data.token;

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('authToken', token);
      storage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      return userData;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed';
      console.error('❌ Login error:', message);
      throw new Error(message);
    }
  };

  // ✅ Forgot Password
  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email }
      );
      return res.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to send reset email';
      throw new Error(message);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
