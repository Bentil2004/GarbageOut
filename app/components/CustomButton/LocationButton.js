import React, { useEffect, useRef, useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";

const LocationButton = ({ setUserLocation, stop }) => {
  const [locationFound, setLocationFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentAccuracy, setCurrentAccuracy] = useState(null);

  const locationSubscription = useRef(null);

  const getLocation = async () => {
    setLoading(true);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        setLoading(false);
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 0,
        },
        (loc) => {
          console.log("Received location:", loc);
          setCurrentAccuracy(loc.coords.accuracy);

          if (loc?.coords?.accuracy && loc.coords.accuracy <= 5) {
            setUserLocation(loc);
            setLocationFound(true);
            setLoading(false);
            subscription.remove();
            locationSubscription.current = null;
          }
        }
      );

      locationSubscription.current = subscription;
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!stop && locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
      setLoading(false);
      console.log("Location tracking stopped manually.");
    }
  }, [stop]);

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      {loading ? (
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={require("../../assets/LocationSearch.json")}
            autoPlay
            loop
            style={{ width: 140, height: 140 }}
          />
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold", color: "#7c6ddd" }}>
            Fetching location, please wait
          </Text>
          {currentAccuracy && (
            <Text style={{ fontSize: 12, color: "#555", marginTop: 5 }}>
              Current accuracy: {currentAccuracy.toFixed(1)} meters
            </Text>
          )}
        </View>
      ) : locationFound ? (
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={require("../../assets/NewDone.json")}
            autoPlay
            loop
            style={{ width: 140, height: 140 }}
          />
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold", color: "#7c6ddd" }}>
            Location found, proceed to submit
          </Text>
          {currentAccuracy && (
            <Text style={{ fontSize: 12, color: "#555", marginTop: 5 }}>
              Current accuracy: {currentAccuracy.toFixed(1)} meters
            </Text>
          )}
        </View>
      ) : (
        <TouchableOpacity
          style={{
            width: 140,
            height: 140,
            backgroundColor: "#55A57F",
            padding: 12,
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={getLocation}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
            Click To Get Current Location
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LocationButton;
