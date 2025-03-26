// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import UploadCDR from './Upload';
// import TrackByLocation from './Trackbylocation';
// import TrackbyNumber from './TrackbyNumber';
// import Sidebar from './Sidebar';
// import TrackByIMEI from './TrackbyIMEI';
// import Login from './login';
// import Register from './register';
// import 'leaflet/dist/leaflet.css';

// function App() {
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

//   return (
//     <Router>
//       <div className="flex">
//         {isAuthenticated && <Sidebar />}
//         <div className="flex-1 p-4">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             {isAuthenticated ? (
//               <>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/upload" element={<UploadCDR />} />
//                 <Route path="/track-location" element={<TrackByLocation />} />
//                 <Route path="/track-number" element={<TrackbyNumber />} />
//                 <Route path="/track-imei" element={<TrackByIMEI />} />
//               </>
//             ) : (
//               <Route path="*" element={<Login />} />
//             )}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



/////////////////////////////////////////////////////////////////
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import UploadCDR from './Upload';
import TrackByLocation from './Trackbylocation';
import TrackbyNumber from './TrackbyNumber';
import Sidebar from './Sidebar';
import TrackByIMEI from './TrackbyIMEI';
 // ✅ Add this line
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadCDR />} />
            <Route path="/track-location" element={<TrackByLocation />} />
            <Route path="/track-number" element={<TrackbyNumber />} />
            <Route path="/track-imei" element={<TrackByIMEI />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
