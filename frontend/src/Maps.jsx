// Maps.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Maps = () => {
  const [filters, setFilters] = useState({
    sourceNumber: '',
    destinationNumber: '',
    imei: '',
  });

  const [filteredData, setFilteredData] = useState([]);
  
  // Sample CDR data (You will replace this with actual uploaded data)
  const sampleData = [
    { id: 1, source: '12345', destination: '54321', imei: '11111', lat: 12.9716, lng: 77.5946 },
    { id: 2, source: '67890', destination: '98765', imei: '22222', lat: 28.6139, lng: 77.2090 },
    { id: 3, source: '12345', destination: '11111', imei: '11111', lat: 19.0760, lng: 72.8777 },
  ];

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleVisualize = () => {
    const filtered = sampleData.filter(record =>
      (!filters.sourceNumber || record.source.includes(filters.sourceNumber)) &&
      (!filters.destinationNumber || record.destination.includes(filters.destinationNumber)) &&
      (!filters.imei || record.imei.includes(filters.imei))
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Visualize CDR Data on Map</h2>
      
      {/* Filter Section */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          name="sourceNumber"
          placeholder="Source Number"
          value={filters.sourceNumber}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="destinationNumber"
          placeholder="Destination Number"
          value={filters.destinationNumber}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="imei"
          placeholder="IMEI Number"
          value={filters.imei}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>

      <button
        onClick={handleVisualize}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Visualize
      </button>

      {/* Map Section */}
      <div className="mt-6 h-[500px] w-full">
        <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {filteredData.map((item) => (
            <Marker key={item.id} position={[item.lat, item.lng]}>
              <Popup>
                Source: {item.source}<br />
                Destination: {item.destination}<br />
                IMEI: {item.imei}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Maps;
