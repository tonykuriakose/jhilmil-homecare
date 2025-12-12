import React, { useState } from 'react';
import { usePatients } from '../context/PatientContext';
import toast from 'react-hot-toast';

const BookingForm = ({ service, onClose }) => {
  const { addBooking } = usePatients();
  const [formData, setFormData] = useState({
    patientName: '',
    contactNumber: '',
    date: '',
    address: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.patientName || !formData.date || !formData.contactNumber) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const booking = {
      id: Date.now(),
      serviceId: service.id,
      serviceName: service.name,
      status: 'Confirmed',
      ...formData
    };

    addBooking(booking);
    toast.success('Booking Successful!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-4">
        <h4 className="text-sm text-slate-400 uppercase font-bold mb-1">Service</h4>
        <p className="text-white font-medium text-lg">{service.name}</p>
        <p className="text-indigo-400 text-sm">{service.cost}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Patient Name *</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          placeholder="Who is this assessment for?"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Date *</label>
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
          <label className="block text-sm font-medium text-slate-400 mb-1">Contact Number *</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            placeholder="(555) 000-0000"
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
            placeholder="Home address for the visit"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
      </div>

      <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="2"
            placeholder="Any specific requirements or conditions?"
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
          Confirm Booking
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
