import React, { useState } from 'react';

const TrackByIMEI = () => {
  const [imei, setIMEI] = useState('');
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showMap, setShowMap] = useState(false);

  // Dummy Data
  const dummyData = [
    { imei: '356789123456789', dateTime: '2025-03-10T10:30', number: '9876543210', location: 'Mumbai', duration: '5 mins' },
    { imei: '356789123456700', dateTime: '2025-03-10T15:00', number: '9123456780', location: 'Delhi', duration: '3 mins' },
    { imei: '356789123456789', dateTime: '2025-03-10T16:45', number: '9988776655', location: 'Mumbai', duration: '7 mins' },
    { imei: '356789123456701', dateTime: '2025-03-11T09:00', number: '9012345678', location: 'Mumbai', duration: '6 mins' },
  ];

  const handleSearch = () => {
    if (!imei.trim()) {
      alert('Please enter an IMEI number.');
      return;
    }

    let result = dummyData.filter((item) => item.imei.includes(imei));

    if (fromDateTime) {
      const from = new Date(fromDateTime).getTime();
      result = result.filter((item) => new Date(item.dateTime).getTime() >= from);
    }

    if (toDateTime) {
      const to = new Date(toDateTime).getTime();
      result = result.filter((item) => new Date(item.dateTime).getTime() <= to);
    }

    setFilteredData(result);
    setShowMap(false); // Hide map when new search happens
  };

  const handleVisualize = () => {
    if (filteredData.length === 0) {
      alert('No data to visualize. Please search first.');
      return;
    }

    setShowMap(true);
  };

  const openGoogleMaps = () => {
    const baseUrl = 'https://www.google.com/maps/search/';
    const locations = filteredData.map((item) => item.location);
    const uniqueLocations = [...new Set(locations)];

    uniqueLocations.forEach((loc) => {
      window.open(`${baseUrl}${encodeURIComponent(loc)}`, '_blank');
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Track & Trace - By IMEI</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter IMEI Number"
          value={imei}
          onChange={(e) => setIMEI(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-64"
        />
        <input
          type="datetime-local"
          value={fromDateTime}
          onChange={(e) => setFromDateTime(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-64"
        />
        <input
          type="datetime-local"
          value={toDateTime}
          onChange={(e) => setToDateTime(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={handleVisualize}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Visualize
        </button>
      </div>

      {filteredData.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <h3 className="text-lg font-semibold mb-3">Filtered Records</h3>
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-3 py-2">IMEI</th>
                <th className="border px-3 py-2">Date & Time</th>
                <th className="border px-3 py-2">Mobile Number</th>
                <th className="border px-3 py-2">Location</th>
                <th className="border px-3 py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-3 py-2">{row.imei}</td>
                  <td className="border px-3 py-2">{new Date(row.dateTime).toLocaleString()}</td>
                  <td className="border px-3 py-2">{row.number}</td>
                  <td className="border px-3 py-2">{row.location}</td>
                  <td className="border px-3 py-2">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-gray-600">No records found for the selected filters.</p>
      )}

      {showMap && filteredData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Visualize on Google Maps:</h3>
          <button
            onClick={openGoogleMaps}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Open in Google Maps
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackByIMEI;
