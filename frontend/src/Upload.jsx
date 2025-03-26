import React, { useState } from 'react';
import uploadLogo from './assets/icon.png'; // You can use your image path

function UploadCDR() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Handle actual upload logic here
    alert('File uploaded successfully!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Section - Logo & Upload */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <img src={uploadLogo} alt="Upload Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 mb-1">gigaTrace</h1>
          <p className="text-sm text-gray-500 mb-6">Central CDR upload Facility</p>

          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 text-sm"
          />
          <button
            onClick={handleUpload}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded flex items-center"
          >
            <span className="mr-2">🔁</span> Upload
          </button>
        </div>

        {/* Right Section - Dropdowns */}
        <div className="bg-gray-50 p-6 rounded-xl w-full md:w-1/2 mt-8 md:mt-0">
          <form className="grid grid-cols-2 gap-4 text-sm">
            {[
              'from_no', 'to_no', 'date', 'time',
              'duration', 'cell_1_id', 'cell_2_id',
              'type', 'imei', 'imsi', 'roaming'
            ].map((field) => (
              <div key={field} className="flex flex-col">
                <label htmlFor={field} className="mb-1 text-gray-600 capitalize">{field.replace(/_/g, ' ')}</label>
                <select id={field} className="border border-gray-300 rounded px-2 py-1">
                  <option>Select</option>
                </select>
              </div>
            ))}
          </form>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadCDR;
