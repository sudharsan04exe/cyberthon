import React, { useState, useContext } from "react";
import { CdrContext } from "./CdrContext_temp";

const TrackByNumber = () => {
  const { cdrData } = useContext(CdrContext); // Access uploaded CDR data
  const [number, setNumber] = useState("");
  const [fromDateTime, setFromDateTime] = useState("");
  const [toDateTime, setToDateTime] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = () => {
    const from = fromDateTime ? new Date(fromDateTime) : null;
    const to = toDateTime ? new Date(toDateTime) : null;

    const result = cdrData.filter((item) => {
      const itemDate = new Date(item["dateTime"]); // Adjust key name based on actual file
      const numberMatch = number ? item["number"].includes(number) : true;
      const fromMatch = from ? itemDate >= from : true;
      const toMatch = to ? itemDate <= to : true;
      return numberMatch && fromMatch && toMatch;
    });

    setFilteredData(result);
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
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
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
                  <td className="border px-4 py-2">{new Date(item.dateTime).toLocaleString()}</td>
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
