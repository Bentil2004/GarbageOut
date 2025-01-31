import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView,
  StyleSheet, Keyboard, TouchableWithoutFeedback, Modal,
  Alert, ActivityIndicator, TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import LocationButton from '../components/CustomButton/LocationButton';
import { BASE_URL } from '../utils/config';
import { useUser } from '../context/UserContext';
import { ScheduleScreen } from "../Styles/Styles";

const bins = [
  { id: 1, name: 'Small', size: '140 litre bin', bags: '2 full black bags', price: 30 },
  { id: 2, name: 'Standard', size: '140 litre bin', bags: '3 full black bags', price: 60 },
  { id: 3, name: 'Large', size: '140 litre bin', bags: '4-5 full black bags', price: 70 },
  { id: 4, name: 'Extra Large', size: '140 litre bin', bags: '6-8 full black bags', price: 100 },
];

const AddScheduleScreen = ({ route }) => {
  const [repeatOption, setRepeatOption] = useState('');
  const [address, setAddress] = useState({});
  const [selectedBins, setSelectedBins] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickUp, setPickUp] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const { user } = useUser();

  const handleSelectBin = (id) => {
    if (!selectedBins.includes(id)) {
      setSelectedBins([...selectedBins, id]);
      setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: 1 }));
    }
  };

  const handleQuantityChange = (id, type) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[id] || 1;
      if (type === 'increase') return { ...prevQuantities, [id]: currentQuantity + 1 };
      else if (type === 'decrease' && currentQuantity > 1) return { ...prevQuantities, [id]: currentQuantity - 1 };
      return prevQuantities;
    });
  };

  const handleCloseBin = (id) => {
    setSelectedBins(selectedBins.filter(binId => binId !== id));
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[id];
      return updatedQuantities;
    });
  };

  const handleSubmit = async () => {
    if (!address?.coords) {
      Alert.alert("Error", "Please get your location first.");
      return;
    }

    const data = {
      name,
      latitude: address.coords.latitude,
      longitude: address.coords.longitude
    };

    console.log(data);

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/create-pick-up-point/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${user?.access}` },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchPickup();
        setIsModalVisible(false);
        setSelectedLocation(name); 
      } else {
        const errorData = await response.json();
        console.log("Errordata", errorData);
        Alert.alert("Error", errorData?.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPickup = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user-pick-up-points/`,
        {
          headers: {
            "Authorization": `Bearer ${user?.access}`
          }
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Errordata", errorData);
        Alert.alert("Error", errorData?.message || "Something went wrong.");
      }
      const data = await response.json();
      setPickUp(data);
      console.log(data);
    } catch (error) {
      console.error("Fetch pickup error:", error);
    }
  };

  useEffect(() => {
    if (route.params?.confirmedAddress) {
      setAddress(route.params.confirmedAddress);
    }
  }, [route.params?.confirmedAddress]);

  useEffect(() => {
    fetchPickup();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>Schedule new pickup</Text>

        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitletop}>Please select an address</Text>
          <View style={styles.addressCard}>
            <DropDownPicker
              open={open}
              value={selectedLocation}
              items={pickUp.map(item => ({ label: item.name, value: item.id }))}
              setOpen={setOpen}
              setValue={setSelectedLocation}
              placeholder="Select a location"
            />
            <TouchableOpacity
              style={styles.plusIconContainer}
              onPress={() => setIsModalVisible(true)}
            >
              <Icon name="add-circle-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>






        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Please stand at the pickup point</Text>
              <TextInput
                style={styles.input}
                placeholder="Please choose a name"
                value={name}
                onChangeText={setName}
              />



              <LocationButton setUserLocation={setAddress} />



              <View style={styles.ModalSubCancel}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.modalButtonText}>{loading ? "Submitting..." : "Submit"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>














       <View style={styles.checkboxContainer}>
          <Text style={styles.sectionTitlemid}>Duration For Pickup</Text>
          {['Daily', 'Weekly', 'Twice Weekly'].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.checkboxRow}
              onPress={() => setRepeatOption(option)}
            >
              <Icon
                name={repeatOption === option ? "radio-button-on" : "radio-button-off"}
                size={20}
                color="#7C6DDD"
              />
              <Text style={styles.checkboxText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitledown}>Size of Bin</Text>
        <Text style={styles.sectionSubtext}>Please select the bin size</Text>

        <ScrollView style={styles.binListContainer}>
          {bins.map((bin) => (
            <TouchableOpacity
              key={bin.id}
              style={[
                styles.binContainer,
                selectedBins.includes(bin.id) && styles.selectedBin,
              ]}
              onPress={() => handleSelectBin(bin.id)}
            >
              <Image source={require('../assets/Bin2.jpeg')} style={styles.binImage} />
              <View style={styles.binDetails}>
                <Text style={styles.binName}>{bin.name}</Text>
                <Text style={styles.binSize}>{bin.size}</Text>
                <Text style={styles.binBags}>{bin.bags}</Text>
                {selectedBins.includes(bin.id) && (
                  <>
                    <Text style={styles.price}>${bin.price * quantities[bin.id]}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => handleQuantityChange(bin.id, 'decrease')}>
                        <Text style={styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{quantities[bin.id]}</Text>
                      <TouchableOpacity onPress={() => handleQuantityChange(bin.id, 'increase')}>
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleCloseBin(bin.id)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('ScheduleConfirmation')}>
          <Text style={styles.scheduleButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback> 
  );
};

export default AddScheduleScreen;

const styles = ScheduleScreen;