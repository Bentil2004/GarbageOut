import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SchedulePage } from '../Styles/Styles';
import LottieView from "lottie-react-native";

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('17');
  const [binCount, setBinCount] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [repeatOption, setRepeatOption] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [schedules, setSchedules] = useState([
    { id: 1, location: 'Home', Coordinate: 'Accra.Newtown.555' },
    { id: 2, location: 'Office', Coordinate: 'West.Legon.Hills' },
    { id: 2, location: 'Church', Coordinate: 'North.Legon.Hills' },
    { id: 2, location: 'Office', Coordinate: 'West.Legon.Hills' },
  ]);

  const navigation = useNavigation();

  const onNotificationPressed = () => {
    navigation.navigate('Notification');
  };

  const addNewSchedule = () => {
    navigation.navigate('AddScheduleScreen');
  };
  

  const onRepeatOptionPressed = (option) => {
    setRepeatOption(option);
    setIsModalVisible(true);
  };

  const onSelectDay = (day) => {
    setSelectedDays((prevDays) => 
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const confirmDaysSelection = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Schedule a Pick Up</Text>
          <Text style={styles.subtitle}>Schedule a pick up at a selected duration!</Text>
          <TouchableOpacity onPress={onNotificationPressed} style={styles.notificationIconWrapper}>
            <Icon name="notifications-outline" size={24} style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

          <Text style={styles.sectionTitle}>SCHEDULED PICKUPS</Text>

          {schedules.length > 0 ? (
             <ScrollView style={styles.scrollContainer}>
             <View style={styles.scheduleList}>
              {schedules.map((schedule) => (
              <View key={schedule.id} style={styles.scheduleCard}>
                <Image source={require('../assets/schedule.png')} style={styles.binImage} />
                <View style={styles.binDetails}>
                <Text style={styles.scheduleDate}>{schedule.location}</Text>
                <Text style={styles.scheduleTime}>{schedule.Coordinate}</Text>
                <Text style={styles.binInfo}>140 litre bin{'\n'}4-5 full black bags</Text>
                <Text style={styles.binPrice}>GHC 70.00</Text>
               </View>
            </View>
          ))}
        </View>
      </ScrollView>        
      ) : (
          <View style={styles.animationContainer}>
            <LottieView
              source={require("../assets/out.json")}
              autoPlay
              loop = {false}
              style={styles.lottieAnimation}
            />
            <Text style={styles.noDataText}>No Schedules Available</Text>
            <Text style={styles.noDatasubText}>Click on the plus icon to schedule a pickup </Text>
          </View>
        )}

      <TouchableOpacity style={styles.addButton} onPress={addNewSchedule}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Schedule;

const styles = SchedulePage;
