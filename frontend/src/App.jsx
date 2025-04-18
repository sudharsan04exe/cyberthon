import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { CdrProvider } from './CdrContext_temp'; // Import the provider
import Dashboard from './Dashboard';
import Upload from './Upload';  // Ensure the name matches
import TrackByLocation from './Trackbylocation';
import TrackbyNumber from './TrackbyNumber';
import Sidebar from './Sidebar';
import TrackByIMEI from './TrackbyIMEI';
import Login from './login';
import Register from './register';
import 'leaflet/dist/leaflet.css';
import UploadedFiles from './Uploadedfiles';

function App() {
  return (
    <CdrProvider> {/* Wrap the app with CdrProvider */}
      <Router>
        <AppContent />
      </Router>
    </CdrProvider>
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
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} /> 
          <Route path="/uploaded-files" element={<UploadedFiles />} />
           {/* Ensure this is correctly named */}
          <Route path="/track-location" element={<TrackByLocation />} />
          <Route path="/track-number" element={<TrackbyNumber />} />
          <Route path="/track-imei" element={<TrackByIMEI />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
