import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaFingerprint } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ❌ REMOVE THIS LINE: autoTable(jsPDF); → Not needed!

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState({
    fromNo: '',
    toNo: '',
    imei: '',
  });

  const data = [
    { fromNo: '1234567890', toNo: '0987654321', imei: '359123456789012' },
    { fromNo: '1122334455', toNo: '5566778899', imei: '359987654321098' },
  ];

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = data.filter((item) =>
    item.fromNo.includes(filters.fromNo) &&
    item.toNo.includes(filters.toNo) &&
    item.imei.includes(filters.imei)
  );

  const columns = [
    { name: 'From No', selector: row => row.fromNo, sortable: true },
    { name: 'To No', selector: row => row.toNo, sortable: true },
    { name: 'IMEI', selector: row => row.imei, sortable: true },
  ];

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CDR_Data');
    XLSX.writeFile(workbook, 'CDR_Data_Export.xlsx');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('CDR Export Data', 20, 10);
    const tableData = filteredData.map(item => [item.fromNo, item.toNo, item.imei]);

    autoTable(doc, {
      head: [['From No', 'To No', 'IMEI']],
      body: tableData,
      startY: 20,
    });

    doc.save('CDR_Data_Export.pdf');
  };

  // Print Table
  const printTable = () => {
    const newWindow = window.open('', '', 'width=800,height=600');
    const tableHTML = `
      <html>
        <head><title>CDR Print</title></head>
        <body>
          <h2>CDR Filtered Data</h2>
          <table border="1" cellpadding="8" cellspacing="0">
            <thead><tr><th>From No</th><th>To No</th><th>IMEI</th></tr></thead>
            <tbody>
              ${filteredData.map(row =>
                `<tr><td>${row.fromNo}</td><td>${row.toNo}</td><td>${row.imei}</td></tr>`).join('')}
            </tbody>
          </table>
        </body>
      </html>`;
    newWindow.document.write(tableHTML);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 relative p-6">
      {/* Toggle Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-md"
        >
          {showSidebar ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[300px] bg-white shadow-lg rounded-lg p-4 text-center z-40">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <ul className="space-y-4 text-left">
            <li>
              <Link to="/track-number" className="text-blue-700 hover:underline flex items-center" onClick={() => setShowSidebar(false)}>
                📞 <span className="ml-2">Track by Number</span>
              </Link>
            </li>
            <li>
              <Link to="/track-location" className="text-blue-700 hover:underline flex items-center" onClick={() => setShowSidebar(false)}>
                📍 <span className="ml-2">Track by Location</span>
              </Link>
            </li>
            <li>
              <Link to="/track-imei" className="text-blue-700 hover:underline flex items-center" onClick={() => setShowSidebar(false)}>
                <FaFingerprint className="text-lg" />
                <span className="ml-2">Track by IMEI Number</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Filter Panel */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-4">CDR Filter Panel</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="fromNo"
            placeholder="From No"
            value={filters.fromNo}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="toNo"
            placeholder="To No"
            value={filters.toNo}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="imei"
            placeholder="IMEI"
            value={filters.imei}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded">
            Export Excel
          </button>
          <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded">
            Export PDF
          </button>
          <button onClick={printTable} className="bg-blue-600 text-white px-4 py-2 rounded">
            Print Table
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={filteredData} pagination highlightOnHover dense />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
