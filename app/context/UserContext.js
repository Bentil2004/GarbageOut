import React, { createContext, useState, useContext } from "react";

// Create User Context
const UserContext = createContext();

// Custom hook for using the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle login
  const login = (userData) => {
    setUser(userData);
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

