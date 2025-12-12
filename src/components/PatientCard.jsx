import React from 'react';
import { User, Calendar, Activity, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

const PatientCard = ({ patient }) => {
  const { id, name, age, typeOfCare, status, nextVisit, address, caregiver } = patient;
  const navigate = useNavigate();

  const statusColors = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-gray-100 text-gray-600',
    Recovered: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-md p-6 border border-slate-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-900/40 rounded-full flex items-center justify-center text-indigo-400 font-bold text-xl">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-100">{name}</h3>
            <p className="text-sm text-slate-400">{age} Years • {typeOfCare}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-slate-700 text-slate-200'}`}>
          {status}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-slate-400 text-sm">
          <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
          <span>Next Visit: <span className="font-medium text-slate-200">{nextVisit}</span></span>
        </div>
        <div className="flex items-center text-slate-400 text-sm">
          <User className="w-4 h-4 mr-2 text-indigo-400" />
          <span>Caregiver: <span className="font-medium text-slate-200">{caregiver}</span></span>
        </div>
        <div className="flex items-center text-slate-400 text-sm">
          <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
          <span className="truncate max-w-[200px]">{address}</span>
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <button 
          onClick={() => navigate(`/patient/${id}`)}
          className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
        >
          View Details
        </button>
        <button className="py-2 px-4 border border-slate-600 hover:border-indigo-300 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors">
          Contact
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
