import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native';


const Home = () => {

  const navigation = useNavigation();


  const onNotificationPressed = () => {
    navigation.navigate('Notification');
  };

  const onSchedulePressed = () => {
    navigation.navigate('Schedule');
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.greetingSection}>
        <Text style={styles.greetingText}>Hello Fiifi</Text>
        <Text style={styles.subText}>Have you taken out the trash today!</Text>
        <TouchableOpacity onPress={onNotificationPressed}>        
               <Icon name="notifications-outline" size={24} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total {'\n'}Pickups</Text>
          <Text style={styles.statValue}>100</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Missed {'\n'} Pickups</Text>
          <Text style={styles.statValue}>5</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Wallet {'\n'} Balance</Text>
          <Text style={styles.statValue}>$100</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.scheduleButton} onPress={onSchedulePressed}>
        <Icon name="time-outline" size={20} color="white" />
        <Text style={styles.scheduleButtonText}>Schedule new pickup</Text>
      </TouchableOpacity>

      <View style={styles.upcomingContainer}>
        <Text style={styles.sectionTitle}>UPCOMING PICKUP</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.pickupCard}>
              <Image source={require('../assets/truck.png')} style={styles.truckIcon} />
              <View>
                <Text style={styles.pickupDate}>24th Fri</Text>
                <Text style={styles.pickupTime}>
                  <Icon name="time-outline" size={16} color="#7C6DDD" /> 09:00 PM
                </Text>
              </View>
            </View>
            <View style={styles.pickupCard}>
              <Image source={require('../assets/truck.png')} style={styles.truckIcon} />
              <View>
                <Text style={styles.pickupDate}>24th Fri</Text>
                <Text style={styles.pickupTime}>
                  <Icon name="time-outline" size={16} color="#7C6DDD" /> 09:00 PM
                </Text>
              </View>
            </View>
            <View style={styles.pickupCard}>
              <Image source={require('../assets/truck.png')} style={styles.truckIcon} />
              <View>
                <Text style={styles.pickupDate}>24th Fri</Text>
                <Text style={styles.pickupTime}>
                  <Icon name="time-outline" size={16} color="#7C6DDD" /> 09:00 PM
                </Text>
              </View>
            </View>
        </ScrollView>
      </View>

      <View style={styles.trackingSection}>
        <Text style={styles.sectionTitle}>LIVE TRACKING OF RIDER</Text>
        <Image source={require('../assets/map.png')} style={styles.mapImage} />
        <View style={styles.trackingInfo}>
          <Image source={require('../assets/truck.png')} style={styles.truckIconSmall} />
          <Text style={styles.trackingText}>Truck arrives in 10mins</Text>
          <TouchableOpacity>
            <Text style={styles.trackLink}>Track</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 80,
  },
  greetingSection: {
    backgroundColor: '#55A57F',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    height:210,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    marginTop: 15,
  },
  subText: {
    fontSize: 16,
    color: 'white',
    marginTop: 0,
  },
  notificationIcon: {
    position: 'absolute',
    top: -50,
    right: 20,
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
    height: 132,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7C6DDD',
    marginTop: 15,
  },
  scheduleButton: {
    flexDirection: 'row',
    backgroundColor: '#7C6DDD',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  scheduleButtonText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  upcomingContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickupCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10, 
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row', 
  },  
  truckIcon: {
    width: 50,
    height: 30,
  },
  pickupDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  pickupTime: {
    fontSize: 14,
    color: '#888',
  },
  trackingSection: {
    padding: 20,
  },
  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  trackingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  truckIconSmall: {
    width: 30,
    height: 20,
  },
  trackingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  trackLink: {
    color: '#7C6DDD',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
