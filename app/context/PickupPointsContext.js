import React, { createContext, useState, useContext } from "react";

const PickupPointsContext = createContext();

export const usePickupPoints = () => useContext(PickupPointsContext);

export const PickupPointsProvider = ({ children }) => {
  const [pickupPoints, setPickupPoints] = useState([]);

return(
      <PickupPointsContext.Provider value={{ pickupPoints, setPickupPoints }}>
      {children}
    </PickupPointsContext.Provider>
  );
};

