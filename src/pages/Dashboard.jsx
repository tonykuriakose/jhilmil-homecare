import React from 'react';
import { useNavigate } from 'react-router';
import PatientCard from '../components/PatientCard';
import { usePatients } from '../context/PatientContext';
import { Activity, Search, Bell, UserCircle, Grid, Calendar } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { patients } = usePatients();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('All Patients');
  const [typeFilter, setTypeFilter] = React.useState('All Types');

  const careTypes = ['All Types', ...new Set(patients.map(p => p.typeOfCare))];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          patient.caregiver.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'All Types' || patient.typeOfCare === typeFilter;
    
    if (activeTab === 'All Patients') return matchesSearch && matchesType;
    if (activeTab === 'Active Care') return matchesSearch && matchesType && patient.status === 'Active';
    if (activeTab === 'Pending Review') return matchesSearch && matchesType && patient.status === 'Inactive';
    if (activeTab === 'Archived') return matchesSearch && matchesType && patient.status === 'Recovered'; 
    return matchesSearch && matchesType;
  });

  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'Active').length,
    alerts: patients.filter(p => p.status === 'Inactive').length, // Mocking alerts based on inactive status
  };

  return (
    <div className="min-h-screen font-sans text-slate-100 bg-slate-900 transition-colors duration-300">
      <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/30">
            <Activity size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Jhilmil<span className="text-indigo-400">HomeCare</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
           <button 
              onClick={() => navigate('/services')}
              className="text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2 hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors"
            >
              <Grid size={18} /> Services
            </button>
            <button 
              onClick={() => navigate('/bookings')}
              className="text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2 hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors"
            >
              <Calendar size={18} /> My Bookings
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search patients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-700 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 text-white w-64 outline-none transition-all placeholder-slate-400"
              />
            </div>
            <button className="p-2 text-slate-400 hover:bg-slate-700 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-800"></span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-700 p-1 pr-3 rounded-full border border-transparent hover:border-slate-600 transition-all">
              <UserCircle className="w-8 h-8 text-slate-400" />
              <span className="text-sm font-medium text-slate-200 hidden sm:block">Admin</span>
            </div>
        </div>
      </nav>


      <main className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Patient Directory</h2>
            <p className="text-slate-400 mt-1">Manage and view all registered patients under care.</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-none transition-all flex items-center gap-2">
            <span>+ Add New Patient</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-slate-400 text-sm font-medium mb-1">Total Patients</p>
                   <h3 className="text-3xl font-bold text-white">{stats.total}</h3>
                </div>
                 <div className="w-12 h-12 bg-indigo-900/40 rounded-full flex items-center justify-center text-indigo-400">
                    <UserCircle size={24} />
                 </div>
            </div>
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-slate-400 text-sm font-medium mb-1">Active Cases</p>
                   <h3 className="text-3xl font-bold text-white">{stats.active}</h3>
                </div>
                 <div className="w-12 h-12 bg-emerald-900/40 rounded-full flex items-center justify-center text-emerald-400">
                    <Activity size={24} />
                 </div>
            </div>
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-slate-400 text-sm font-medium mb-1">Attention Needed</p>
                   <h3 className="text-3xl font-bold text-white">{stats.alerts}</h3>
                </div>
                 <div className="w-12 h-12 bg-amber-900/40 rounded-full flex items-center justify-center text-amber-400">
                    <Bell size={24} />
                 </div>
            </div>
        </div>


        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700 pb-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All Patients', 'Active Care', 'Pending Review', 'Archived'].map((tab, i) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'bg-indigo-900/30 text-indigo-400' 
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Filter by Care:</span>
            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-800 text-slate-200 text-sm rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                {careTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))
          ) : (
             <div className="col-span-full py-12 text-center text-slate-500">
                <p>No patients found matching your search.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};


export default Dashboard;
