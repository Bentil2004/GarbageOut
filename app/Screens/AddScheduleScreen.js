import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView,
  StyleSheet, Keyboard, TouchableWithoutFeedback,Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';

const bins = [
  { id: 1, name: 'Small', size: '140 litre bin', bags: '2 full black bags', price: 30 },
  { id: 2, name: 'Standard', size: '140 litre bin', bags: '3 full black bags', price: 60 },
  { id: 3, name: 'Large', size: '140 litre bin', bags: '4-5 full black bags', price: 70 },
  { id: 4, name: 'Extra Large', size: '140 litre bin', bags: '6-8 full black bags', price: 100 },
];

const AddScheduleScreen = ({ route }) => {
  const [repeatOption, setRepeatOption] = useState('');
  const [address, setAddress] = useState('45 Kofi Annan St, Accra, Ghana');
  const [locationName, setLocationName] = useState('');
  const [selectedBins, setSelectedBins] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);  
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const navigation = useNavigation();

  const locations = [
    { label: 'Home', value: 'home' },
    { label: 'Office', value: 'office' },
  ];

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

  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setAddress(`Lat: ${latitude}, Lon: ${longitude}`);
        setIsModalVisible(false);
      },
      (error) => {
        console.error(error);
        setIsModalVisible(false);
      }
    );
  };

  useEffect(() => {
    if (route.params?.confirmedAddress) {
      setAddress(route.params.confirmedAddress);
    }
  }, [route.params?.confirmedAddress]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>Schedule new pickup</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitletop}>Please select an address</Text>
          <View style={styles.addressCard}>
            <DropDownPicker
              open={open}
              value={locationName}
              items={locations}
              setOpen={setOpen}
              setValue={setLocationName}
              setItems={() => {}}
              containerStyle={styles.dropdownContainer}
              dropDownStyle={styles.dropDownStyle}
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
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={fetchCurrentLocation} 
              >
                <Text style={styles.modalButtonText}>Get My Location</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => setIsModalVisible(false)} 
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
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

        <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('Address')}>
          <Text style={styles.scheduleButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingHorizontal: 25,
  },
  addressContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addressCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    width: 300,
    position: 'relative',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  locationInput: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 10,
    height: 40,
  },
  dropDownStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  checkboxContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  binListContainer: {
    maxHeight: 320,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  binContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedBin: {
    borderColor: '#34D186',
    borderWidth: 2,
  },
  binImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  binDetails: {
    flex: 1,
  },
  binName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  binSize: {
    fontSize: 14,
    color: '#555',
  },
  binBags: {
    fontSize: 12,
    color: '#777',
  },
  closeButton: {
    position: 'absolute',
    top: -65,
    right: 5,
    padding: 5,
    backgroundColor: '#000',
    borderRadius: 15,
    width: 25,
    height: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
  },
  price: {
    fontSize: 14,
    color: '#34D186',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 10,
    padding: 10,
    backgroundColor: '#5555',
    textAlign: 'center',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C6DDD',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  scheduleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  sectionTitletop: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  sectionSubtext: {
    fontSize: 14,
    color: '#555',
    marginTop: 1,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  sectionTitlemid: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: -5,
  },
  sectionTitledown: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  plusIconContainer: {
    position: 'absolute',
    right: -55, 
    top: '30%',
    transform: [{ translateY: -15 }],
    // borderWidth: 1,
    width: 50,
    height: 50,
    backgroundColor: '#7C6DDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  modalButton: {
    backgroundColor: '#7C6DDD',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
