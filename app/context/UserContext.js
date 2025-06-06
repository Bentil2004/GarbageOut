import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const TOKEN_KEY = "access_token";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation()

  const login = async (userData) => {
    try {
      if (userData?.access) {
        await SecureStore.setItemAsync(TOKEN_KEY, userData.access);
      }
      setUser(userData);
    } catch (error) {
      console.error("Error storing access token:", error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing access token:", error);
    }
    setUser(null);
    navigation.navigate('LogIn')
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (accessToken) {
          setUser({ access: accessToken });
        }
      } catch (error) {
        console.error("Failed to load access token:", error);
      }
    };

    loadToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

