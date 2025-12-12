import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockPatients } from '../data/mockPatients';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem('jhilmil_patients');
    return savedPatients ? JSON.parse(savedPatients) : mockPatients;
  });

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('jhilmil_bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('jhilmil_patients', JSON.stringify(patients));
  }, [patients]);

  // Save to localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem('jhilmil_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const updatePatient = (id, updatedData) => {
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === id ? { ...patient, ...updatedData } : patient
      )
    );
  };

  const addBooking = (booking) => {
    setBookings(prev => [...prev, booking]);
  };

  return (
    <PatientContext.Provider value={{ patients, updatePatient, bookings, addBooking }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};
