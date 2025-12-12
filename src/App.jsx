import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import PatientDetails from './pages/PatientDetails';
import Services from './pages/Services';
import MyBookings from './pages/MyBookings';
import { PatientProvider } from './context/PatientContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <PatientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </PatientProvider>
  );
};

export default App;
