import React, { useState } from "react";
import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

const LocationButton = ({setUserLocation}) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);

    try {
      // Request permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        setLoading(false);
        return;
      }

      // Get current location with high accuracy
      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setLocation(userLocation.coords);
      setUserLocation(userLocation)
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Button title="Get Current Location" onPress={getLocation} />

      {loading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 10 }} />}

      {location && (
        <Text style={{ marginTop: 10 }}>
          Latitude: {location.latitude} {"\n"}
          Longitude: {location.longitude}
        </Text>
      )}
    </View>
  );
};

export default LocationButton;

