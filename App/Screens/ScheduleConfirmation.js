import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ScheduleConfirmation = () => {
  const navigation = useNavigation();

  const onbackPressed = () => {
    navigation.navigate('Schedule');
  };
  return (
    <View style={styles.container}>

        <TouchableOpacity onPress={onbackPressed}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>

      <Text style={styles.header}>Confirm Schedule Details</Text>

      <View style={styles.detailsCard}>
        <Image
          source={require('../assets/Bin2.jpeg')} 
          style={styles.binImage}
        />

        <View style={styles.detailsText}>
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Bin size:</Text> <Text style={styles.value}>40 Litres, 2 full black bags</Text>
          </Text>
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Schedule date:</Text> <Text style={styles.value}>24/10/2024</Text>
          </Text>
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Duration:</Text> <Text style={styles.value}>Repeat Daily</Text>
          </Text>
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Price:</Text> <Text style={styles.value}>$100.00</Text>
          </Text>
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Address:</Text> <Text style={styles.value}>GA1184349</Text>
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.paymentButton}>
        <Text style={styles.paymentButtonText}>Proceed to payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleConfirmation;

const styles = StyleSheet.create({
  backButton: {
        fontSize: 29,
        color: '#000000',
        position: 'absolute',
        top: 20,
        left: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    paddingTop: 80,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  binImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsText: {
    width: '100%',
  },
  detailItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  label: {
    color: 'gray',
  },
  value: {
    color: '#00CC66',
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#7C6DDD',
    borderRadius: 10,
    paddingVertical: 15,
    top: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
