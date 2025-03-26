import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import UploadCDR from './Upload';
import TrackByLocation from './Trackbylocation';
import TrackbyNumber from './TrackbyNumber';
import Sidebar from './Sidebar';
import TrackByIMEI from './TrackbyIMEI';
import Login from './login';
import Register from './register';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  
  // Hide sidebar for Login and Register pages
  const hideSidebar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 p-4">
        <Routes>
          {/* Redirect '/' to '/register' */}
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadCDR />} />
          <Route path="/track-location" element={<TrackByLocation />} />
          <Route path="/track-number" element={<TrackbyNumber />} />
          <Route path="/track-imei" element={<TrackByIMEI />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
