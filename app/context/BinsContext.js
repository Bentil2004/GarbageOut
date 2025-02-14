import React, { createContext, useState, useContext } from "react";

const BinsContext = createContext();

export const useBins = () => useContext(BinsContext);

export const BinsProvider = ({ children }) => {
  const [bins, setBins] = useState([]);

return(
      <BinsContext.Provider value={{ bins, setBins }}>
      {children}
    </BinsContext.Provider>
  );
};

