import React from 'react';
import { Clock, DollarSign, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{service.name}</h3>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-700 text-slate-300 rounded-full border border-slate-600">
            {service.category}
        </span>
      </div>
      
      <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
        {service.description}
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-slate-300 text-sm">
          <Clock size={16} className="text-indigo-400 mr-2" />
          <span>{service.duration}</span>
        </div>
        <div className="flex items-center text-slate-300 text-sm">
          <DollarSign size={16} className="text-emerald-400 mr-2" />
          <span>{service.cost}</span>
        </div>
      </div>

      <button 
        onClick={() => onBook(service)}
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group-hover:bg-indigo-500"
      >
        Book This Service <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default ServiceCard;
