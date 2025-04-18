import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadedFiles = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/cdr/uploaded-files");
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Uploaded CDR Files</h2>
                {files.length === 0 ? (
                    <p className="text-gray-500">No files uploaded yet.</p>
                ) : (
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Filename</th>
                                <th className="border border-gray-300 px-4 py-2">Uploaded By</th>
                                <th className="border border-gray-300 px-4 py-2">Upload Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr key={file._id}>
                                    <td className="border border-gray-300 px-4 py-2">{file.originalname}</td>
                                    <td className="border border-gray-300 px-4 py-2">{file.uploadedBy}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(file.uploadDate).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UploadedFiles;
