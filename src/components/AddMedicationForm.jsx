import React, { useState } from 'react';
import { usePatients } from '../context/PatientContext';
import toast from 'react-hot-toast';

const AddMedicationForm = ({ patient, onClose }) => {
  const { updatePatient } = usePatients();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newMedication = {
      ...formData
    };

    const updatedMedications = patient.medications ? [...patient.medications, newMedication] : [newMedication];
    
    updatePatient(patient.id, { medications: updatedMedications });
    toast.success('Medication added successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Medication Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g. Lisinopril"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Dosage</label>
          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            required
             placeholder="e.g. 10mg"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
           <label className="block text-sm font-medium text-slate-400 mb-1">Frequency</label>
          <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
            placeholder="e.g. Once Daily"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Discontinued">Discontinued</option>
        </select>
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
          Add Medication
        </button>
      </div>
    </form>
  );
};

export default AddMedicationForm;
