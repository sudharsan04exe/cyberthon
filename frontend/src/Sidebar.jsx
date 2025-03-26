import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaUpload, FaCog, FaEnvelope, FaFileUpload } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-gray-900 text-white p-6 space-y-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-6">CDR Analyzer</h1>

      <ul className="space-y-5">
        <li className="flex items-center space-x-3 hover:text-blue-400">
          <FaHome />
          <Link to="/dashboard" className="text-lg">Home</Link>
        </li>
        <li className="flex items-center space-x-3 hover:text-blue-400">
          <FaUser />
          <Link to="/account" className="text-lg">Account</Link>
        </li>
        <li className="flex items-center space-x-3 hover:text-blue-400">
          <FaUpload />
          <Link to="/uploaded-files" className="text-lg">Uploaded Files</Link>
        </li>
        <li className="flex items-center space-x-3 hover:text-blue-400">
          <FaFileUpload />
          <Link to="/upload" className="text-lg">Upload New File</Link>
        </li>
        <li className="flex items-center space-x-3 hover:text-blue-400">
          <FaCog />
          <Link to="/settings" className="text-lg">Settings</Link>
        </li>
        <li className="flex items-center space-x-3 hover:text-blue-400">
          <FaEnvelope />
          <Link to="/contact-us" className="text-lg">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
