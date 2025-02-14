import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import LocationButton from "../components/CustomButton/LocationButton";
import { useUser } from "../context/UserContext";
import { ScheduleScreen } from "../Styles/Styles";
import { BASE_URL } from "../utils/config";

const AddScheduleScreen = ({ route }) => {
  const [repeatOption, setRepeatOption] = useState("");
  const [address, setAddress] = useState({});
  const [selectedBins, setSelectedBins] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickUp, setPickUp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBins, setLoadingBins] = useState(false);
  const [name, setName] = useState("");
  const { user } = useUser();
  const [bins, setBins] = useState([]);
  const [durations, setDurations] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);

  const navigation = useNavigation();

  const handleSelectBin = (id) => {
    setSelectedBins((prevSelectedBins) => {
      console.log(prevSelectedBins);
      const binExists = prevSelectedBins.some((bin) => bin.trash_bin === id);

      if (!binExists) {
        return [
          ...prevSelectedBins,
          { trash_bin: id, number_of_trash_bins: quantities[id] || 1 },
        ];
      }
      return prevSelectedBins;
    });

    if (!quantities[id]) {
      setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: 1 }));
    }
  };

  const handleQuantityChange = (id, type) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[id] || 1;
      let newQuantity = currentQuantity;

      if (type === "increase") {
        newQuantity = currentQuantity + 1;
      } else if (type === "decrease" && currentQuantity > 1) {
        newQuantity = currentQuantity - 1;
      }

      setSelectedBins((prevSelectedBins) => {
        return prevSelectedBins.map((bin) => {
          if (bin.trash_bin === id) {
            return { ...bin, number_of_trash_bins: newQuantity };
          }
          return bin;
        });
      });

      return { ...prevQuantities, [id]: newQuantity };
    });
  };


  
  // Handle bin removal (deletion)
  const handleCloseBin = (id) => {
    setSelectedBins((prevSelectedBins) => {
      return prevSelectedBins.filter((bin) => bin.trash_bin !== id);
    });

    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[id];
      return updatedQuantities;
    });
  };

  const trashBins = selectedBins.map((bin) => ({
    trash_bin: bin.trash_bin,
    number_of_trash_bins: bin.number_of_trash_bins,
  }));

  // Submit Schedule to backend
  const submitSchedule = () => {
    const data = {
      location: selectedLocation.id,
      subscription: selectedOption.subscription_id,
      trash_bins: trashBins.length > 0 ? trashBins : null,
    };
  };

  // Fetch pickup points
  const fetchPickup = async () => {
    try {
      const response = await fetch(`${BASE_URL}accounts/user-pick-up-points/`, {
        headers: {
          Authorization: `Bearer ${user?.access}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Error", errorData?.message || "Something went wrong.");
      }

      const data = await response.json();
      setPickUp(data);
    } catch (error) {
      console.error("Fetch pickup error:", error);
    }
  };

  // Fetch bins
  const fetchBins = async () => {
    setLoadingBins(true);
    try {
      const response = await fetch(`${BASE_URL}core/bins`);
      const data = await response.json();
      setBins(data);
    } catch (error) {
      console.error("Error fetching bins:", error.message);
    } finally {
      setLoadingBins(false);
    }
  };

  // Fetch durations
  const fetchDurations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}core/subscriptions`);
      const data = await response.json();

      const mappedDurations = data.map((d) => {
        return {
          subscription_id: d.subscription_id,
          subscription_name: d.subscription_name,
          per_month: d.per_month,
          schedules: d.schedules,
        };
      });

      setDurations(mappedDurations);
    } catch (error) {
      console.error("Error fetching durations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!address?.coords) {
      Alert.alert("Error", "Please get your location first.");
      return;
    }

    const data = {
      name,
      latitude: address.coords.latitude,
      longitude: address.coords.longitude,
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}accounts/create-pick-up-point/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        await fetchPickup();
        setIsModalVisible(false);
        setSelectedLocation(name);
        setName("");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData?.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    console.log(option);
    setSelectedOption(option);
    setInputValues(Array(option.per_month).fill(""));
  };

  useEffect(() => {
    fetchPickup();
    fetchDurations();
    fetchBins();
  }, []);

  useEffect(() => {
    if (route.params?.confirmedAddress) {
      setAddress(route.params.confirmedAddress);
    }
  }, [route.params?.confirmedAddress]);

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };


  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.header}>Schedule new pickup</Text>

        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitletop}>Please select an address</Text>
          <View style={styles.addressCard}>
            <DropDownPicker
              open={open}
              style={styles.address}
              value={selectedLocation}
              items={pickUp.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
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
              <Text style={styles.modalTitle}>
                Please stand at the pickup point
              </Text>
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
                  <Text style={styles.modalButtonText}>
                    {loading ? "Submitting..." : "Submit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>












        <Text style={styles.sectionTitledown}>Duration for Pickup</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#7C6DDD" />
        ) : (
          durations.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.checkboxRow}
              onPress={() => handleOptionSelect(option)}
            >
              <Icon
                name={
                  selectedOption?.subscription_id === option.subscription_id
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={20}
                color="#7C6DDD"
              />
              <Text style={styles.checkboxText}>
                {option.subscription_name}
                {option.schedules && option.schedules.length > 0 && (
                  <Text style={styles.scheduleDatesText}>
                    {" on "}
                    {option.schedules.map((schedule, idx) => (
                      <Text key={schedule.id}>
                        {schedule.day_of_the_month}
                        {getOrdinalSuffix(schedule.day_of_the_month)}
                        {idx < option.schedules.length - 1 ? ", " : ""}
                      </Text>
                    ))}
                  </Text>
                )}
              </Text>
            </TouchableOpacity>
          ))
        )}









        <Text style={styles.sectionTitledown}>Size of Bin</Text>
        <Text style={styles.sectionSubtext}>Please select the bin size:</Text>

        {loadingBins ? (
          <ActivityIndicator size="medium" color="#7C6DDD" />
        ) : (
          <View style={styles.binListContainer}>
            {bins.map((bin) => (
              <TouchableOpacity
                key={bin.id}
                style={[
                  styles.binContainer,
                  selectedBins.some(binGroup => binGroup.trash_bin === bin.id) && styles.selectedBin,
                ]}
                onPress={() => handleSelectBin(bin.id)}
              >
                <Image
                  source={require("../assets/Bin2.jpeg")}
                  style={styles.binImage}
                />
                <View style={styles.binDetails}>
                  <Text style={styles.binName}>Bin Size: {bin.size}</Text>
                  <Text style={styles.price}>
                    GHC {bin.price * (quantities[bin.id] || 1)}
                  </Text>
                  {selectedBins.some(binGroup => binGroup.trash_bin === bin.id) && (
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => handleQuantityChange(bin.id, "decrease")}
                      >
                        <Text style={styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {quantities[bin.id]}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleQuantityChange(bin.id, "increase")}
                      >
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleCloseBin(bin.id)}
                        style={styles.closeButton}
                      >
                        <Text style={styles.closeButtonText}>X</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>



      <TouchableOpacity style={styles.scheduleButton} onPress={submitSchedule}>
        <Text style={styles.scheduleButtonText}>Proceed to Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScheduleScreen;

const styles = ScheduleScreen;
