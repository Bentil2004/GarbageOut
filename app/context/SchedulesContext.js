import React, { createContext, useState, useContext } from "react";

const SchedulesContext = createContext();

export const useSchedules = () => useContext(SchedulesContext);

export const SchedulesProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);

return(
      <SchedulesContext.Provider value={{ schedules, setSchedules }}>
      {children}
    </SchedulesContext.Provider>
  );
};

