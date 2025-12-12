
import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePatients } from '../context/PatientContext';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import EditPatientForm from '../components/EditPatientForm';
import AddMedicationForm from '../components/AddMedicationForm';
import AddAppointmentForm from '../components/AddAppointmentForm';
import { User, Calendar, Activity, MapPin, Phone, ArrowLeft, FileText, Pill } from 'lucide-react';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients } = usePatients();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isAddMedicationModalOpen, setIsAddMedicationModalOpen] = React.useState(false);
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = React.useState(false);
  const patient = patients.find(p => p.id === parseInt(id));

  if (!patient) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Patient Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6 md:p-8">
      <button 
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      {/* Header Section */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-400 font-bold text-3xl border border-indigo-500/30">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{patient.name}</h1>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-500/20">
                  ID: #{patient.id}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300">
                  {patient.age} Years Old
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300">
                  {patient.typeOfCare}
                </span>
              </div>
            </div>
          </div>
           <div className="flex gap-3">
             <button 
               onClick={() => setIsEditModalOpen(true)}
               className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-900/20"
              >
              Edit Profile
            </button>
            <button 
              onClick={() => toast.success(`Contacting caregiver: ${patient.caregiver}`)}
              className="px-4 py-2 border border-slate-600 hover:border-slate-500 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
            >
              Contact Caregiver
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Info & Vitals */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <User className="text-indigo-400" size={20} /> Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500 font-bold">Address</label>
                <p className="text-slate-200 flex items-start gap-2 mt-1">
                  <MapPin size={16} className="mt-1 text-slate-400" />
                  {patient.address}
                </p>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500 font-bold">Caregiver</label>
                <p className="text-slate-200 flex items-center gap-2 mt-1">
                  <User size={16} className="text-slate-400" />
                  {patient.caregiver}
                </p>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500 font-bold">Emergency Contact</label>
                <p className="text-slate-200 flex items-center gap-2 mt-1">
                  <Phone size={16} className="text-slate-400" />
                  +1 (555) 000-0000
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="text-emerald-400" size={20} /> Current Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 font-medium bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-500/20">
                  {patient.status}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Next Visit</span>
                <span className="text-white font-medium">{patient.nextVisit}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Last Vitals</span>
                <span className="text-slate-300 text-sm">Today, 9:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Medical History & Notes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="text-blue-400" size={20} /> Medical Notes
            </h3>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <p className="text-slate-300 leading-relaxed">
                {patient.note}
              </p>
            </div>
          </div>

           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Pill className="text-amber-400" size={20} /> Medications
              </h3>
              <button 
                onClick={() => setIsAddMedicationModalOpen(true)}
                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded-lg transition-colors border border-slate-600"
              >
                + Add
              </button>
            </div>
            <div className="space-y-3">
              {patient.medications && patient.medications.length > 0 ? (
                patient.medications.map((med, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-900/30 text-amber-500 flex items-center justify-center">
                        <Pill size={14} />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-200">{med.name}</h4>
                        <p className="text-xs text-slate-400">{med.dosage} • {med.frequency}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-slate-800 text-slate-300 px-2 py-1 rounded">
                      {med.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-slate-500 text-center py-4 italic">
                  No active medications recorded.
                </div>
              )}
            </div>
          </div>
          
           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="text-purple-400" size={20} /> Upcoming Appointments
              </h3>
               <button 
                onClick={() => setIsAddAppointmentModalOpen(true)}
                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded-lg transition-colors border border-slate-600"
              >
                + Schedule
              </button>
            </div>
            <div className="space-y-3">
              {patient.appointments && patient.appointments.length > 0 ? (
                patient.appointments.map((appt, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                     <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-900/30 text-purple-400 flex items-center justify-center">
                        <Calendar size={14} />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-200">{appt.type}</h4>
                        <p className="text-xs text-slate-400">with {appt.doctor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm text-slate-200 font-medium">{appt.date}</p>
                       <p className="text-xs text-slate-400">{appt.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-500 text-center py-4 italic">
                  No additional appointments scheduled.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Patient Profile"
      >
        <EditPatientForm 
          patient={patient} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      </Modal>

      <Modal
        isOpen={isAddMedicationModalOpen}
        onClose={() => setIsAddMedicationModalOpen(false)}
        title="Add New Medication"
      >
        <AddMedicationForm 
          patient={patient} 
          onClose={() => setIsAddMedicationModalOpen(false)} 
        />
      </Modal>

       <Modal
        isOpen={isAddAppointmentModalOpen}
        onClose={() => setIsAddAppointmentModalOpen(false)}
        title="Schedule Appointment"
      >
        <AddAppointmentForm 
          patient={patient} 
          onClose={() => setIsAddAppointmentModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};

export default PatientDetails;
