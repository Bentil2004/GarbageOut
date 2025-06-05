import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { HomePage } from "../Styles/Styles";
import { useSchedules } from "../context/SchedulesContext";
import { useUser } from "../context/UserContext";
import { BASE_URL } from "../utils/config";
import { useBins } from "../context/BinsContext";

const Home = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const { schedules, setSchedules } = useSchedules()
  const [isLoading, setIsLoading] = useState(false);
  const shedules = useMemo(() => {
   const upcoming = schedules?.filter(item => item?.picked_up == false && item?.payment?.payed == true)
    return upcoming
  }, [schedules])
  const { setBins } = useBins()


  const fetchSchedules = async () => {
    try {
      console.log('fetching')
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/schedules/schedule-pickup/`, {
        headers: {
          Authorization: `Bearer ${user?.access}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData)
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

  const fetchBins = async () => {
    //setLoadingBins(true);
    try {
      const response = await fetch(`${BASE_URL}core/bins/`);
      const data = await response.json();
      setBins(data);
    } catch (error) {
      console.error("Error fetching bins:", error.message);
    } finally {
      //setLoadingBins(false);
    }
  };


  
  useEffect(() => {
    fetchSchedules()
    fetchBins()
      }, []);

  const onNotificationPressed = () => {
    navigation.navigate("Notification");
  };

  const onSchedulePressed = () => {
    navigation.navigate("AddScheduleScreen");
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
      <View style={styles.greetingSection}>
        <Text style={styles.greetingText}>Welcome to GarbageOut</Text>
        <Text style={styles.subText}>Have you taken out the trash today!</Text>
        {/* <TouchableOpacity onPress={onNotificationPressed}>
          <Icon
            name="notifications-outline"
            size={24}
            style={styles.notificationIcon}
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total {"\n"}Schedules</Text>
          <Text style={styles.statValue}>{schedules?.length}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Successful {"\n"} Pickups</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Missed {"\n"} Pickups</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={onSchedulePressed}
      >
        <Icon name="time-outline" size={20} color="white" />
        <Text style={styles.scheduleButtonText}>Schedule new pickup</Text>
      </TouchableOpacity>

      <View style={styles.upcomingContainer}>
        <Text style={styles.sectionTitle}>Upcoming pickups</Text>

        {shedules?.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {shedules?.map((shedule) => (
                            <View key={shedule?.schedule_id} style={styles.scheduleCard}>
                <Image source={require('../assets/schedule.png')} style={styles.binImage} />
                <View style={styles.binDetails}>
                <Text style={styles.scheduleDate}>{shedule?.location?.name}</Text>
                <Text style={styles.scheduleTime}>{shedule?.subscription?.subscription_name}</Text>
                  {shedule?.subscription?.schedules && shedule?.subscription?.schedules .length > 0 && (
                  <Text style={styles.scheduleTime}>
                    {"Pickup date on "}
                    {shedule?.subscription?.schedules?.map((schedule, idx) => (
                      <Text key={schedule.id}>
                        {schedule.day_of_the_month}
                        {getOrdinalSuffix(schedule.day_of_the_month)}
                        {idx < shedule?.subscription?.schedules.length - 1 ? ", " : ""}
                      </Text>
                    ))}
                  </Text>
                )} 

                <Text style={styles.binPrice}>{`GHC ${shedule?.payment?.amount}`}</Text>
               </View>
            </View>

            ))}
          </ScrollView>
        ) : (
          <View style={styles.animationContainer}>
            <LottieView
              source={require("../assets/out.json")}
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
            />
            <Text style={styles.noDataText}>No upcoming pickups</Text>
            <Text style={styles.noDatasubText}>Proceed to schedule a pickup </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = HomePage;

export default Home;
