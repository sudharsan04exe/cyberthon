import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaFingerprint, FaUpload } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import API_BASE_URL from './config';
import { CdrContext } from './CdrContext_temp';

const Dashboard = () => {
  const { cdrData, setCdrData } = useContext(CdrContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState({ fromNo: '', toNo: '', imei: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Data from API when the component loads if context is empty
  useEffect(() => {
    if (cdrData.length === 0) {
      fetch(`${API_BASE_URL}/fetch-cdr`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched CDR Data:", data); // Debugging Output
          setCdrData(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [cdrData, setCdrData]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Clear Table Data
  const clearTable = () => {
    setCdrData([]);
  };

  // ✅ Apply filters correctly
  const filteredData = cdrData.filter((item) =>
    item.from_no?.toString().includes(filters.fromNo) &&
    item.to_no?.toString().includes(filters.toNo) &&
    item.imei?.toString().includes(filters.imei)
  );
  
  // ✅ Columns Configuration
  const columns = [
    { name: 'From No', selector: row => row.from_no, sortable: true },
    { name: 'To No', selector: row => row.to_no, sortable: true },
    { name: 'IMEI', selector: row => row.imei, sortable: true },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Time', selector: row => row.time, sortable: true }
  ];
  
  // ✅ Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CDR_Data');
    XLSX.writeFile(workbook, 'CDR_Data_Export.xlsx');
  };

  // ✅ Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('CDR Export Data', 20, 10);
    autoTable(doc, { head: [['From No', 'To No', 'IMEI']], body: filteredData.map(item => [item.from_no, item.to_no, item.imei]), startY: 20 });
    doc.save('CDR_Data_Export.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 relative p-6">
      <div className="absolute top-4 right-4 z-50">
        <button onClick={toggleSidebar} className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-md">
          {showSidebar ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {showSidebar && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[300px] bg-white shadow-lg rounded-lg p-4 text-center z-40">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <ul className="space-y-4 text-left">
            <li><Link to="/track-number" className="text-blue-700 hover:underline flex items-center" onClick={() => setShowSidebar(false)}>📞 Track by Number</Link></li>
            <li><Link to="/track-location" className="text-blue-700 hover:underline flex items-center" onClick={() => setShowSidebar(false)}>📍 Track by Location</Link></li>
            <li><Link to="/track-imei" className="text-blue-700 hover:underline flex items-center" onClick={() => setShowSidebar(false)}><FaFingerprint className="text-lg" /> Track by IMEI</Link></li>
          </ul>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-4">CDR Filter Panel</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="text" name="fromNo" placeholder="From No" value={filters.fromNo} onChange={handleInputChange} className="border p-2 rounded w-full" />
          <input type="text" name="toNo" placeholder="To No" value={filters.toNo} onChange={handleInputChange} className="border p-2 rounded w-full" />
          <input type="text" name="imei" placeholder="IMEI" value={filters.imei} onChange={handleInputChange} className="border p-2 rounded w-full" />
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded">Export Excel</button>
          <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded">Export PDF</button>
          <button onClick={clearTable} className="bg-gray-600 text-white px-4 py-2 rounded">Clear Table</button>
        </div>

        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        {loading ? <p>Loading data...</p> : (
          <>
            {cdrData.length === 0 && <p className="text-gray-500">No data available. Please upload a valid CDR file.</p>}
            <DataTable columns={columns} data={filteredData} pagination highlightOnHover dense />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;