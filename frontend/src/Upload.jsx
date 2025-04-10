import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { CdrContext } from "./CdrContext_temp";
import uploadLogo from "./assets/icon.png";

const UploadCDR = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { setCdrData } = useContext(CdrContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      setCdrData(sheetData);
      navigate("/dashboard");
    };

    reader.readAsBinaryString(selectedFile);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center w-full md:w-1/2">
          <img src={uploadLogo} alt="Upload Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 mb-1">CDR Analyzer</h1>
          <p className="text-sm text-gray-500 mb-6">Upload the CDR file</p>
          <input type="file" accept=".xlsx" onChange={handleFileChange} className="mb-4 text-sm" />
          <button
            onClick={handleUpload}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded flex items-center"
          >
            <span className="mr-2">🔁</span> Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCDR;
