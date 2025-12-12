import React, { useState } from 'react';
import { usePatients } from '../context/PatientContext';
import toast from 'react-hot-toast';

const AddAppointmentForm = ({ patient, onClose }) => {
  const { updatePatient } = usePatients();
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    doctor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAppointment = {
      ...formData
    };

    const updatedAppointments = patient.appointments ? [...patient.appointments, newAppointment] : [newAppointment];
    
    updatePatient(patient.id, { appointments: updatedAppointments });
    toast.success('Appointment scheduled successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Appointment Type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          placeholder="e.g. General Checkup, Physiotherapy"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
           <label className="block text-sm font-medium text-slate-400 mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Doctor / Specialist</label>
        <input
          type="text"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          required
          placeholder="e.g. Dr. House"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-700">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm"
        >
          Schedule Appointment
        </button>
      </div>
    </form>
  );
};

export default AddAppointmentForm;
