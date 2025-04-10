import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadedFiles = () => {
    const [files, setFiles] = useState([]);

    // Fetch uploaded files from the backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/cdr/uploaded-files")  // Update the endpoint
            .then(response => setFiles(response.data))
            .catch(error => console.error("🔥 Error fetching files:", error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">📂 Uploaded Files</h2>

            {files.length === 0 ? (
                <p className="text-gray-500">No files uploaded yet.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">#</th>
                            <th className="border p-2">File Name</th>
                            <th className="border p-2">Upload Date</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={file._id} className="text-center">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{file.filename}</td>
                                <td className="border p-2">{new Date(file.uploadDate).toLocaleString()}</td>
                                <td className="border p-2">
                                    <a
                                        href={`http://localhost:5000/uploads/${file.filename}`}  // Update path as needed
                                        className="text-blue-500 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View / Download
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UploadedFiles;
