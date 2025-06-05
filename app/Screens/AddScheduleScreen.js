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
import { usePickupPoints } from "../context/PickupPointsContext";
import { useSubscriptions } from "../context/SubscriptionsContext";
import { useBins } from "../context/BinsContext";


const AddScheduleScreen = ({ route }) => {
  //const [repeatOption, setRepeatOption] = useState("");
  const [address, setAddress] = useState({});
  const [selectedBins, setSelectedBins] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [loadingBins, setLoadingBins] = useState(false);
  const [name, setName] = useState("");
  const { user } = useUser();
  const {pickupPoints, setPickupPoints} = usePickupPoints()
  const { subscriptions, setSubscriptions } = useSubscriptions()
  const {bins, setBins} = useBins()
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValues, setInputValues] = useState([]);

  const navigation = useNavigation();

  const handleSelectBin = (id) => {
    setSelectedBins((prevSelectedBins) => {
      const binExists = prevSelectedBins.some((bin) => bin.trash_bin === id);

      if (!binExists) {
        return [
          ...prevSelectedBins,
          { trash_bin: id, number_of_trash_bins: 1 },
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
  const submitSchedule = async () => {
    if (!selectedLocation) {
      Alert.alert("Error", "Please select a location.");
      return;
    }

    if (!selectedOption) {
      Alert.alert("Error", "Please select a subscription.");
      return;
    }

    if (trashBins.length == 0) {
      Alert.alert("Error", "Please select trash bins.");
      return;
    }

    const data = {
      subscription: selectedOption.subscription_id,
      location: selectedLocation,
      trash_bins: trashBins.length > 0 ? trashBins : null,
    };


    try {
      setIsLoading1(true);
          console.log("backend data:", JSON.stringify(data), user?.access);
      const response = await fetch(`${BASE_URL}schedules/schedule-pickup/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Alert.alert("Success", "Schedule submitted successfully!");
        const data = await response.json();
        console.log(data)
        navigation.navigate("ScheduleConfirmation", data);
      } else {
        const errorData = await response.json();
        console.error(errorData)
        Alert.alert("Error", errorData?.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error)
    } finally {
      setIsLoading1(false);
    }
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
        Alert.alert("Error", errorData?.message || "Something went wrong fetching pickup points.");
      }

      const data = await response.json();
      setPickupPoints(data);
    } catch (error) {
      console.error("Fetch pickup error:", error);
    }
  };

  // Fetch bins
  const fetchBins = async () => {
    setLoadingBins(true);
    try {
      const response = await fetch(`${BASE_URL}core/bins/`);
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
      const response = await fetch(`${BASE_URL}core/subscriptions/`);
      const data = await response.json();
      setSubscriptions(data)
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };


  //Submit Location
  const handleSubmit = async () => {
    if (!address?.coords) {
      Alert.alert("Error", "Please get your location first.");
      return;
    }
    if (!name) {
      Alert.alert("Error", "Please enter your location name.");
      return;
    }

    const data = {
      name,
      latitude: address.coords.latitude,
      longitude: address.coords.longitude,
    };

    try {
      setIsLoading(true);
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
      }
      else {
        const errorData = await response.json();
                console.error(errorData)
        Alert.alert("Error", errorData?.message || "Something went wrong!.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
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

  const onNotificationPressed = () => {
    navigation.navigate('Notification');
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule new pickup</Text>
        <Text style={styles.subtitle}>Add new pickup</Text>
        {/* <TouchableOpacity onPress={onNotificationPressed} style={styles.notificationIconWrapper}>
            <Icon name="notifications-outline" size={24} style={styles.notificationIcon} />
          </TouchableOpacity> */}
      </View>
      <ScrollView style={styles.scrollview}>

        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitletop}>Please select a location </Text>
          <View style={styles.addressCard}>
            <DropDownPicker
              open={open}
              style={styles.address}
              value={selectedLocation}
              items={pickupPoints?.map((item) => ({
                label: item?.name,
                value: item?.id,
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
              <Text style={{textAlign:'left', width: '100%', fontWeight: 'bold', marginBottom: 5}}>Location name: </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your location name"
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
                    {isLoading ? "Submitting..." : "Submit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>



        <Text style={styles.sectionTitledown}>Subscription for Pickup</Text>
        {loading && subscriptions?.length == 0 ? (
          <ActivityIndicator size="small" color="#7C6DDD" />
        ) : (
          subscriptions?.map((option, index) => (
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
                  {/* {option.schedules && option.schedules.length > 0 && (
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
                )} */}
              </Text>
            </TouchableOpacity>
          ))
        )}

        <Text style={styles.sectionTitledown}>Size of Bin</Text>
        <Text style={styles.sectionSubtext}>Please select the bin size:</Text>

        {loadingBins && bins?.length == 0 ? (
          <ActivityIndicator size="medium" color="#7C6DDD" />
        ) : (
          <View style={styles.binListContainer}>
            {bins.map((bin) => (
              <TouchableOpacity
                key={bin.id}
                style={[
                  styles.binContainer,
                  selectedBins.some(
                    (binGroup) => binGroup.trash_bin === bin.id
                  ) && styles.selectedBin,
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
                  {selectedBins.some(
                    (binGroup) => binGroup.trash_bin === bin.id
                  ) && (
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
        <Text style={styles.scheduleButtonText}>{isLoading1 ? "Submitting..." : "Proceed to Submit"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScheduleScreen;

const styles = ScheduleScreen;
