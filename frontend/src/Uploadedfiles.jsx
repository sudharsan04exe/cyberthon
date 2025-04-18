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
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map(file => (
                    <li key={file._id}>
                        {file.originalname} - {file.filename}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UploadedFiles;
