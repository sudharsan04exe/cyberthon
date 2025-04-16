import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dummy CDR data
const dummyCdrData = [
  {
    number: "9876543210",
    location: "Mumbai",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    dateTime: "2025-04-01T10:00:00",
    imei: "123456789012345"
  },
  {
    number: "9876543210",
    location: "Pune",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    dateTime: "2025-04-02T14:30:00",
    imei: "123456789012345"
  },
  {
    number: "9876543210",
    location: "Nashik",
    coordinates: { lat: 19.9975, lng: 73.7898 },
    dateTime: "2025-04-03T09:15:00",
    imei: "123456789012345"
  }
];

const TrackByNumber = () => {
  const [number, setNumber] = useState("");
  const [fromDateTime, setFromDateTime] = useState("");
  const [toDateTime, setToDateTime] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showMap, setShowMap] = useState(false);

  const handleSearch = () => {
    const from = fromDateTime ? new Date(fromDateTime) : null;
    const to = toDateTime ? new Date(toDateTime) : null;

    const result = dummyCdrData.filter((item) => {
      const itemDate = new Date(item.dateTime);
      const numberMatch = number ? item.number.includes(number) : true;
      const fromMatch = from ? itemDate >= from : true;
      const toMatch = to ? itemDate <= to : true;
      return numberMatch && fromMatch && toMatch;
    });

    setFilteredData(result);
    setShowMap(result.length > 0);
  };

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
      </div>

      {/* Table View */}
      <div className="overflow-x-auto mb-8">
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

      {/* Map Visualization */}
      {showMap && (
        <div className="h-[400px] w-full">
          <MapContainer
            center={[
              filteredData[0].coordinates.lat,
              filteredData[0].coordinates.lng
            ]}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {filteredData.map((item, index) => (
              <Marker
                key={index}
                position={[
                  item.coordinates.lat,
                  item.coordinates.lng
                ]}
              >
                <Popup>
                  <div>
                    <strong>{item.location}</strong>
                    <br />
                    {new Date(item.dateTime).toLocaleString()}
                    <br />
                    IMEI: {item.imei}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default TrackByNumber;
