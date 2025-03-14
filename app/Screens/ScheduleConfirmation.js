import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Modal, Pressable } from 'react-native';
import { usePickupPoints } from '../context/PickupPointsContext';
import { useSubscriptions } from '../context/SubscriptionsContext';
import { useBins } from '../context/BinsContext';

const ScheduleConfirmation = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const {pickupPoints} = usePickupPoints()
  const { subscriptions } = useSubscriptions()
  const { bins } = useBins()

  const { data } = route.params || {};
  console.log(subscriptions)

  const calculateTotal = () => {
    return data?.trash_bins?.reduce((total, bin) => total + getBinPrice(bin?.trash_bin) * bin?.number_of_trash_bins, 0);
  };

  const onProceedPressed = () => {
    setModalVisible(true);
  };

  const onConfirmPayment = () => {
    setModalVisible(false);
    navigation.navigate("BottomTabNavigator",{screen: "Payment",});
  };

  const getLocationName = (id) =>{
    const found = pickupPoints?.find(item => item?.id == id)
    return found?.name
  }

  const getSubscriptionName = (id) => {
    const found = subscriptions?.find(item => item?.subscription_id == id)
    return found?.subscription_name
  }

  const getBinSize = (id) =>{
    const found = bins.find(item => item?.id == id)
    return found?.size
  }

  const getBinPrice = (id) =>{
    const found = bins.find(item => item?.id == id)
    return found?.price
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirm Schedule Details</Text>

      <View style={styles.detailsCard}>
        <Image source={require('../assets/schedule.png')} style={styles.binImage} />
        
        <ScrollView style={styles.detailsText} showsVerticalScrollIndicator={false}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Location name:</Text>
            <Text style={styles.value}>{data?.location?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Subscription:</Text>
            <Text style={styles.value}>{data?.subscription?.subscription_name}</Text>
          </View>
          {data?.trash_bins?.map((bin, index) => (
            <View key={index} style={styles.binDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Bin size:</Text>
                <Text style={styles.value}>{getBinSize(bin?.trash_bin)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.value}>{bin?.number_of_trash_bins}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.valueprice}>{`GHC ${getBinPrice(bin?.trash_bin) * bin?.number_of_trash_bins}.00`}</Text>
              </View>
            </View>
          ))}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Total amount:</Text>
            <Text style={styles.value}>{`GHC ${data?.payment?.amount}`}</Text>
          </View>

        </ScrollView>
      </View>

      {/*<TouchableOpacity style={styles.scheduleButton} onPress={onProceedPressed}>
        <Text style={styles.scheduleButtonText}>{`Proceed to payment - GHC ${calculateTotal()}.00`}</Text>
      </TouchableOpacity>*/}
      <View style={styles.scheduleButtonContainer} >
        <TouchableOpacity style={styles.scheduleButton} onPress={onProceedPressed}>
        <Text style={styles.scheduleButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{`Payment of GHC ${calculateTotal()}.00?`}</Text>
            <Text>Please proceed to payment</Text>
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
  scheduleButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    //backgroundColor: '#7C6DDD',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  scheduleButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C6DDD',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    // marginTop: 15,
    marginBottom: 30,
  },
  scheduleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
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
