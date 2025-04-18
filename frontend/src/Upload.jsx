import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedBy, setUploadedBy] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate for redirection

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

            // Redirect to Dashboard after a successful upload
            if (response.status === 200) {
                navigate('/dashboard');  // Redirect to Dashboard page
            }
        } catch (error) {
            setMessage("Error uploading file: " + error.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
            />
            <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Upload;
