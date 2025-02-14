import React, { createContext, useState, useContext } from "react";

const SubscriptionsContext = createContext();

export const useSubscriptions = () => useContext(SubscriptionsContext);

export const SubscriptionsProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);

return(
      <SubscriptionsContext.Provider value={{ subscriptions, setSubscriptions }}>
      {children}
    </SubscriptionsContext.Provider>
  );
};

