import React, { useState } from 'react';

const TrackByLocation = () => {
  const [location, setLocation] = useState('');
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Dummy data
  const dummyData = [
    {
      location: 'Mumbai',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      dateTime: '2025-03-10T10:30',
      number: '9876543210',
      duration: '5 mins',
    },
    {
      location: 'Mumbai',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      dateTime: '2025-03-10T15:00',
      number: '9123456780',
      duration: '3 mins',
    },
  ];

  const handleSearch = () => {
    const from = fromDateTime ? new Date(fromDateTime) : null;
    const to = toDateTime ? new Date(toDateTime) : null;

    const results = dummyData.filter((item) => {
      const itemTime = new Date(item.dateTime);
      return (
        item.location.toLowerCase().includes(location.toLowerCase()) &&
        (!from || itemTime >= from) &&
        (!to || itemTime <= to)
      );
    });

    setFilteredData(results);
  };

  const handleVisualize = () => {
    if (filteredData.length === 0) {
      alert('No records to visualize');
      return;
    }

    const { coordinates } = filteredData[0];
    const numbers = filteredData.map(item => item.number).join(', ');
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}&query_place_id=${encodeURIComponent(numbers)}`;

    window.open(mapUrl, '_blank');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Track & Trace - By Location</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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

      {filteredData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-3 py-2">Location</th>
                <th className="border px-3 py-2">DateTime</th>
                <th className="border px-3 py-2">Mobile Number</th>
                <th className="border px-3 py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-3 py-2">{row.location}</td>
                  <td className="border px-3 py-2">{new Date(row.dateTime).toLocaleString()}</td>
                  <td className="border px-3 py-2">{row.number}</td>
                  <td className="border px-3 py-2">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrackByLocation;
