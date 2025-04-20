import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CdrContext } from "./CdrContext_temp";

// 🗺️ Define cell ID to location mapping
const cellIdToLocation = {
  100: { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  101: { name: "Delhi", lat: 28.6139, lng: 77.209 },
  102: { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  200: { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  201: { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  // Add more mappings as needed
};

const TrackByLocation = () => {
  const { cdrData } = useContext(CdrContext);
  const [location, setLocation] = useState("");
  const [fromDateTime, setFromDateTime] = useState("");
  const [toDateTime, setToDateTime] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (cdrData && Array.isArray(cdrData)) {
      setFilteredData(cdrData);
      setShowMap(cdrData.length > 0);
    }
  }, [cdrData]);

  const handleSearch = () => {
    if (!cdrData || !Array.isArray(cdrData)) {
      setFilteredData([]);
      setShowMap(false);
      return;
    }

    const from = fromDateTime ? new Date(fromDateTime) : null;
    const to = toDateTime ? new Date(toDateTime) : null;

    const result = cdrData
      .filter((item) => {
        const itemDate = item.date ? new Date(item.date) : null;
        const locationMatch = location
          ? (cellIdToLocation[item.cell_1_id] &&
              cellIdToLocation[item.cell_1_id].name
                .toLowerCase()
                .includes(location.toLowerCase()))
          : true;
        const fromMatch = from && itemDate ? itemDate >= from : true;
        const toMatch = to && itemDate ? itemDate <= to : true;
        return locationMatch && fromMatch && toMatch;
      })
      .map((item) => {
        const locationInfo = cellIdToLocation[item.cell_1_id] || {
          name: "Unknown",
          lat: 0,
          lng: 0,
        };
        return {
          ...item,
          location: locationInfo.name,
          coordinates: {
            lat: locationInfo.lat,
            lng: locationInfo.lng,
          },
          dateTime: item.date ? new Date(item.date) : null, // Ensure correct date format
        };
      });

    setFilteredData(result);
    setShowMap(result.length > 0);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Track by Location</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-1"
        >
          Search
        </button>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border border-gray-300 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">From</th>
              <th className="border px-4 py-2 text-left">To</th>
              <th className="border px-4 py-2 text-left">Location</th>
              <th className="border px-4 py-2 text-left">Date & Time</th>
              <th className="border px-4 py-2 text-left">IMEI</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.from_no}</td>
                  <td className="border px-4 py-2">{item.to_no}</td>
                  <td className="border px-4 py-2">{item.location}</td>
                  <td className="border px-4 py-2">
                    {item.dateTime
                      ? item.dateTime.toLocaleString()
                      : "-"}
                  </td>
                  <td className="border px-4 py-2">{item.imei}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Map View */}
      {showMap && filteredData[0]?.coordinates?.lat !== 0 && (
        <div className="h-[400px] w-full overflow-hidden">
          <MapContainer
            center={[
              filteredData[0]?.coordinates?.lat || 0,
              filteredData[0]?.coordinates?.lng || 0,
            ]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {filteredData.map((item, index) => (
              <Marker
                key={index}
                position={[item.coordinates?.lat || 0, item.coordinates?.lng || 0]}
              >
                <Popup>
                  <div>
                    <strong>{item.location}</strong>
                    <br />
                    {item.dateTime
                      ? item.dateTime.toLocaleString()
                      : "-"}
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

export default TrackByLocation;
