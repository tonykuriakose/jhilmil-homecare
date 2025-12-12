import React from 'react';
import { usePatients } from '../context/PatientContext';
import { ArrowLeft, Calendar, User, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

const MyBookings = () => {
  const { bookings } = usePatients();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6 md:p-8">
      <button 
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">My Bookings</h1>
        <div className="bg-indigo-900/30 text-indigo-400 px-4 py-2 rounded-full border border-indigo-500/30 text-sm font-medium">
            Total Bookings: {bookings.length}
        </div>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all shadow-lg">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-700/50">
                    <div>
                        <h3 className="text-lg font-bold text-white">{booking.serviceName}</h3>
                        <span className="text-xs font-medium px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded border border-emerald-500/20 mt-1 inline-block">
                            {booking.status}
                        </span>
                    </div>
                    <div className="bg-slate-700 p-2 rounded-lg text-slate-300">
                        <Calendar size={20} />
                    </div>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                        <User size={16} className="text-indigo-400 mt-0.5" />
                        <div>
                            <span className="text-slate-400 block text-xs uppercase font-bold">Patient</span>
                            <span className="text-slate-200">{booking.patientName}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <Calendar size={16} className="text-purple-400 mt-0.5" />
                        <div>
                            <span className="text-slate-400 block text-xs uppercase font-bold">Date</span>
                            <span className="text-slate-200">{booking.date}</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Phone size={16} className="text-amber-400 mt-0.5" />
                        <div>
                            <span className="text-slate-400 block text-xs uppercase font-bold">Contact</span>
                            <span className="text-slate-200">{booking.contactNumber}</span>
                        </div>
                    </div>

                    {booking.address && (
                        <div className="flex items-start gap-3">
                            <MapPin size={16} className="text-red-400 mt-0.5" />
                            <div>
                                <span className="text-slate-400 block text-xs uppercase font-bold">Address</span>
                                <span className="text-slate-200">{booking.address}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-slate-700/50 border-dashed">
            <Calendar size={48} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-300 mb-2">No Bookings Yet</h3>
            <p className="text-slate-500 mb-6">You haven't booked any homecare services yet.</p>
            <button 
                onClick={() => navigate('/services')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
                Browse Services
            </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
