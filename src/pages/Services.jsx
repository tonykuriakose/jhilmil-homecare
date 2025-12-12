import React, { useState } from 'react';
import { mockServices } from '../data/mockServices';
import ServiceCard from '../components/ServiceCard';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import Modal from '../components/Modal';
import BookingForm from '../components/BookingForm';

const Services = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const categories = ['All', ...new Set(mockServices.map(s => s.category))];

  const filteredServices = filter === 'All' 
    ? mockServices 
    : mockServices.filter(s => s.category === filter);

  const handleBook = (service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6 md:p-8">
      <button 
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
           <h1 className="text-3xl font-bold text-white mb-2">Our Services</h1>
           <p className="text-slate-400 max-w-2xl">
             Professional homecare services tailored to your needs. Browse our catalog and book a visit today.
           </p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
            <div className="px-3 py-1 text-slate-400 flex items-center gap-2 text-sm font-medium border-r border-slate-700 pr-3 mr-1">
                <Filter size={14} /> Filter:
            </div>
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        filter === cat 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <ServiceCard key={service.id} service={service} onBook={handleBook} />
        ))}
      </div>

      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Book Service"
      >
        {selectedService && (
          <BookingForm 
            service={selectedService} 
            onClose={() => setIsBookingModalOpen(false)} 
          />
        )}
      </Modal>
    </div>
  );
};

export default Services;
