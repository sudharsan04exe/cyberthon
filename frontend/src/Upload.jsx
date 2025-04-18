import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedBy, setUploadedBy] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setSelectedFile(file);
        } else {
            alert("Please upload a valid Excel file!");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !uploadedBy) {
            setMessage("Please provide a file and your name.");
            return;
        }

        const formData = new FormData();
        formData.append('cdrFile', selectedFile);
        formData.append('uploadedBy', uploadedBy);

        try {
            const response = await axios.post("http://localhost:5000/api/cdr/upload", formData);
            setMessage(response.data.message || 'File uploaded successfully!');
            if (response.status === 200) {
                // You can pass the uploaded data to the dashboard as a prop or fetch it directly.
                navigate('/dashboard');  // Navigate to the dashboard
            }
        } catch (error) {
            setMessage("Error uploading file: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Upload CDR File</h2>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={uploadedBy}
                    onChange={(e) => setUploadedBy(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                />
                <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                    className="w-full mb-4"
                />
                <button
                    onClick={handleUpload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Upload
                </button>
                {message && <p className="text-center mt-4 text-sm text-gray-600">{message}</p>}
            </div>
        </div>
    );
};

export default Upload;
