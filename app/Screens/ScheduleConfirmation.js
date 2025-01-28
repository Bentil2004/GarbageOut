import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ScheduleConfirmation = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const { locationName, coordinates, duration, bins } = route.params || {
    locationName: 'Home',
    coordinates: 'Accra Newtown 555',
    duration: 'Repeat Daily',
    bins: [
      { size: '40 Litres', bags: '2 full black bags', price: 100, quantity: 1 },
      // { size: '140 Litres', bags: '4 full black bags', price: 70, quantity: 2 },
    ],
  };

  const calculateTotal = () => {
    return bins.reduce((total, bin) => total + bin.price * bin.quantity, 0);
  };

  const onProceedPressed = () => {
    setModalVisible(true);
  };

  const onConfirmPayment = () => {
    setModalVisible(false);
    navigation.navigate("BottomTabNavigator",{screen: "Payment",});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirm Schedule Details</Text>

      <View style={styles.detailsCard}>
        <Image source={require('../assets/schedule.png')} style={styles.binImage} />
        <ScrollView style={styles.detailsText} showsVerticalScrollIndicator={false}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Location name:</Text>
            <Text style={styles.value}>{locationName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Coordinates:</Text>
            <Text style={styles.value}>{coordinates}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{duration}</Text>
          </View>
          {bins.map((bin, index) => (
            <View key={index} style={styles.binDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Bin size:</Text>
                <Text style={styles.value}>{bin.size}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Bag:</Text>
                <Text style={styles.value}>{bin.bags}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.value}>{bin.quantity}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.valueprice}>${bin.price * bin.quantity}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.scheduleButton} onPress={onProceedPressed}>
        <Text style={styles.scheduleButtonText}>Proceed to payment - ${calculateTotal()}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Payment of ${calculateTotal()}?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonConfirm]} onPress={onConfirmPayment}>
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ScheduleConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 70,
  },
  detailsCard: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  binImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsText: {
    width: '100%',
    marginBottom: 350,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    color: 'gray',
    fontSize: 16,
    marginRight: 10,
  },
  value: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  binDetails: {
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  scheduleButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#7C6DDD',
    paddingVertical: 35,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: 'white',
    fontSize: 21,
  },
  valueprice: {
    color: '#34D186',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonConfirm: {
    backgroundColor: '#7C6DDD',
  },
  buttonCancel: {
    backgroundColor: '#DD4B39',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
