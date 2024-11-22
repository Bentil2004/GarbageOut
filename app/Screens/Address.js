import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

const AddressScreen = ({ navigation }) => {
  const [inputAddress, setInputAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [loading, setLoading] = useState(false);

  const fetchGeocodeData = async () => {
    setLoading(true);
    const url = `https://google-maps-geocoding3.p.rapidapi.com/geocode?address=${encodeURIComponent(inputAddress)}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.AIzaSyA6dCGX2ejJSDpH9UfZe9x_5PP-RLd0xCQ, 
        'x-rapidapi-host': 'google-maps-geocoding3.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setLoading(false);

      if (result?.results && result.results.length > 0) {
        const location = result.results[0].geometry.location;
        setRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        alert('Could not find location data. Please try a different address.');
      }
    } catch (error) {
      setLoading(false);
      alert('Failed to fetch geocode data. Please check your network or API configuration.');
    }
  };

  const onConfirmAddress = () => {
    navigation.navigate("ScheduleConfirmation");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          value={inputAddress}
          onChangeText={setInputAddress}
        />
        <TouchableOpacity style={styles.button} onPress={fetchGeocodeData}>
          <Text style={styles.buttonText}>Mark my Location</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instructionText}>
        Please stand at the location of the bin for us to take the coordinates.
      </Text>
      <Text style={styles.sub}>
        This makes it easier for the riders to pickup the garbage.
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#7C6DDD" style={styles.loader} />
      ) : (
        <MapView style={styles.map} region={region}>
          <Marker coordinate={region} />
        </MapView>
      )}

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirmAddress}>
          <Icon name="checkmark-circle-outline" size={20} color="white" />
          <Text style={styles.confirmButtonText}>Confirm Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  instructionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    backgroundColor: '#ffff',
  },
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    width: 220,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#7C6DDD',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
  },
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: '#7C6DDD',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  sub: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 50,
  },
});
