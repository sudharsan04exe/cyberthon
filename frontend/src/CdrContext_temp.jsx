import React, { createContext, useState, useEffect } from "react";

export const CdrContext = createContext();

export const CdrProvider = ({ children }) => {
  const [cdrData, setCdrData] = useState(() => {
    const savedData = localStorage.getItem("cdrData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cdrData", JSON.stringify(cdrData));
  }, [cdrData]);

  return (
    <CdrContext.Provider value={{ cdrData, setCdrData }}>
      {children}
    </CdrContext.Provider>
  );
};
