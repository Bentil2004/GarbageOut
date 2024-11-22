import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const ScheduleConfirmation = ({ route }) => {
  const { locationName, coordinates, duration, bins } = route.params || {
    locationName: 'Home',
    coordinates: 'Accra Newtown 555',
    duration: 'Repeat Daily',
    bins: [
      { size: '40 Litres', bags: '2 full black bags', price: 100, quantity: 1 },
    ],
  };

  return (
    <View style={styles.container}>
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
                <Text style={styles.label}>Bags:</Text>
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
    marginTop: 50,
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
  valueprice: {
    color: '#34D186',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
