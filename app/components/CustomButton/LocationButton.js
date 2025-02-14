import React, { useState } from "react";
import { View, Text, Button, Alert,TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";

const LocationButton = ({ setUserLocation }) => {
  const [locationFound, setLocationFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);

    try {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        setLoading(false);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setUserLocation(userLocation);
      setLocationFound(true);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      {loading ? (
      <View style={{alignItems: 'center'}} >
        <LottieView
          source={require("../../assets/LocationSearch.json")}
          autoPlay
          loop
          style={{ width: 140, height: 140 }}
        />
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold", color: "#7c6ddd" }}>
            Fetching location, please wait
          </Text>
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
        </View>
      ) : (
        <TouchableOpacity 
            style={{
              width: 140,
              height: 140,
              backgroundColor: "#55A57F", 
              padding: 12, 
              borderRadius: '100%', 
              display: "flex",
              justifyContent: 'center',
                alignItems: 'center'
            }} 
            onPress={getLocation}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: 'center' }}>
              Click To Get Current Location
            </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LocationButton;
