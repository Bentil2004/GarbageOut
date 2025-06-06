import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal, ActivityIndicator, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SchedulePage } from '../Styles/Styles';
import LottieView from "lottie-react-native";
import { BASE_URL } from '../utils/config';
import { useUser } from '../context/UserContext';
import { useSchedules } from '../context/SchedulesContext';
import * as SecureStore from "expo-secure-store";

const Schedule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState('17');
  const [binCount, setBinCount] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [repeatOption, setRepeatOption] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);  
  const navigation = useNavigation();
  const { logout } = useUser();
  const { schedules, setSchedules } = useSchedules()


  const onNotificationPressed = () => {
    navigation.navigate('Notification');
  };

  const addNewSchedule = () => {
    navigation.navigate('AddScheduleScreen');
  };

  const fetchSchedules = async () => {
    try {
      console.log('fetching')
      setIsLoading(true);
            const token = await SecureStore.getItemAsync("access_token");
      const response = await fetch(`${BASE_URL}/schedules/schedule-pickup/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData)
        if(errorData["code"] == "token_not_valid"){
          logout()
        }
      }

      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setSchedules(sortedData)
      console.log('sorted: ',sortedData)
    } catch (error) {
      console.error("Fetch pickup error:", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(()=> {
    fetchSchedules()
  }, [])

  const handleRefresh = () => {
    fetchSchedules()
  }
  

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
        <View style={styles.header}>
          <Text style={styles.title}>Schedule a Pick up</Text>
          <Text style={styles.subtitle}>Schedule a pick up at a selected duration</Text>
          {/* <TouchableOpacity onPress={onNotificationPressed} style={styles.notificationIconWrapper}>
            <Icon name="notifications-outline" size={24} style={styles.notificationIcon} />
          </TouchableOpacity> */}
        </View>

          <Text style={styles.sectionTitle}>SCHEDULED PICKUPS</Text>

          {schedules?.length > 0 ? (
             <ScrollView refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            tintColor={"black"}
          />} style={styles.scrollContainer}>
             <View style={styles.scheduleList}>
              {schedules.map((shedule) => (
              <View key={shedule?.schedule_id} style={styles.scheduleCard}>
  <Image source={require('../assets/schedule.png')} style={styles.binImage} />

  <View style={styles.binDetails}>
    <Text style={styles.scheduleDate}>{shedule?.location?.name}</Text>
    <Text style={styles.scheduleTime}>{shedule?.subscription?.subscription_name}</Text>

    {shedule?.subscription?.schedules?.length > 0 && (
      <Text style={styles.scheduleTime}>
        Pickup date on{' '}
        {shedule.subscription.schedules.map((schedule, idx) => (
          <Text key={schedule.id}>
            {schedule.day_of_the_month}
            {getOrdinalSuffix(schedule.day_of_the_month)}
            {idx < shedule.subscription.schedules.length - 1 ? ', ' : ''}
          </Text>
        ))}
      </Text>
    )}

    <View style={styles.priceStatusContainer}>
      <Text style={styles.binPrice}>{`GHC ${shedule?.price}`}</Text>

      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: shedule?.picked_up ? '#DFF3EB' : '#FFE3E3',
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color: shedule?.picked_up ? '#2E7D4F' : '#D32F2F',
            },
          ]}
        >
          {shedule?.picked_up ? 'Picked up' : 'Not picked up'}
        </Text>
      </View>
    </View>
  </View>
</View>

          ))}
        </View>
      </ScrollView>        
      ) : isLoading ? (
          <ActivityIndicator size="small" color="#7C6DDD" />
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
