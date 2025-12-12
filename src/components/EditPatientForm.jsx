import React, { useState } from 'react';
import { usePatients } from '../context/PatientContext';
import toast from 'react-hot-toast';

const EditPatientForm = ({ patient, onClose }) => {
  const { updatePatient } = usePatients();
  const [formData, setFormData] = useState({
    name: patient.name,
    age: patient.age,
    address: patient.address,
    caregiver: patient.caregiver,
    note: patient.note,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatient(patient.id, formData);
    toast.success('Profile updated successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
           <label className="block text-sm font-medium text-slate-400 mb-1">Caregiver</label>
          <input
            type="text"
            name="caregiver"
            value={formData.caregiver}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="2"
          required
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Medical Notes</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows="4"
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditPatientForm;
