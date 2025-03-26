import React, { useState, useEffect } from 'react';

const TrackByNumber = () => {
  const [number, setNumber] = useState('');
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Dummy data (with coordinates added for map visualization)
  const dummyData = [
    {
      number: '1234567890',
      location: 'New York',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      dateTime: '2024-12-01T10:00',
      imei: '123456789012345',
    },
    {
      number: '9876543210',
      location: 'Los Angeles',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      dateTime: '2024-12-02T14:30',
      imei: '987654321098765',
    },
    {
      number: '1234567890',
      location: 'Chicago',
      coordinates: { lat: 41.8781, lng: -87.6298 },
      dateTime: '2024-12-03T09:15',
      imei: '123456789012345',
    },
  ];

  const handleSearch = () => {
    const from = fromDateTime ? new Date(fromDateTime) : null;
    const to = toDateTime ? new Date(toDateTime) : null;

    const result = dummyData.filter((item) => {
      const itemDate = new Date(item.dateTime);
      const numberMatch = number ? item.number.includes(number) : true;
      const fromMatch = from ? itemDate >= from : true;
      const toMatch = to ? itemDate <= to : true;
      return numberMatch && fromMatch && toMatch;
    });

    setFilteredData(result);
  };

  const handleVisualize = () => {
    if (filteredData.length === 0) {
      alert('No data to visualize');
      return;
    }

    // Show location of the first matching record
    const { coordinates, location } = filteredData[0];

    if (coordinates) {
      const mapUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
      window.open(mapUrl, '_blank');
    } else {
      alert(`No coordinates found for location: ${location}`);
    }
  };

  useEffect(() => {
    setFilteredData(dummyData); // Load all data initially
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Track by Number</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          placeholder="Source Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={fromDateTime}
          onChange={(e) => setFromDateTime(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={toDateTime}
          onChange={(e) => setToDateTime(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleVisualize}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Visualize
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Number</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Date & Time</th>
              <th className="border px-4 py-2">IMEI</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.number}</td>
                  <td className="border px-4 py-2">{item.location}</td>
                  <td className="border px-4 py-2">
                    {new Date(item.dateTime).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">{item.imei}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackByNumber;
