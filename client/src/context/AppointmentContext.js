import { createContext, useContext, useState, useEffect } from 'react';
import { fetchAppointments } from '../services/appointmentService';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const data = await fetchAppointments();
    setAppointments(data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <AppointmentContext.Provider value={{ appointments, loadAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);
