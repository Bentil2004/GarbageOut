import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { HomePage } from "../Styles/Styles";
import { useSchedules } from "../context/SchedulesContext";
import { useUser } from "../context/UserContext";
import { BASE_URL } from "../utils/config";
import { useBins } from "../context/BinsContext";
import * as SecureStore from "expo-secure-store";

const Home = () => {
  const navigation = useNavigation();
  const { logout } = useUser();
  const { schedules, setSchedules } = useSchedules()
  const [isLoading, setIsLoading] = useState(false);
  const shedules = useMemo(() => {
   const upcoming = schedules?.filter(item => item?.picked_up == false && item?.has_payed == true)
    return upcoming
  }, [schedules])
  const { setBins } = useBins()


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

  const fetchBins = async () => {
    //setLoadingBins(true);
    try {
      const token = await SecureStore.getItemAsync("access_token");
      const response = await fetch(`${BASE_URL}/core/bins/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const refetch = () => {
    fetchSchedules()
    fetchBins()
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

  const pickedUp = () => {
    const found  = schedules?.filter(i => i.picked_up == true)
    return found?.length
  }

  const pending = () => {
    const found  = schedules?.filter(i => i.picked_up == false && i.has_payed == true && i.payment_status=="successfull")
    return found?.length
  }

  return (
    <View style={styles.container}>
      <View style={styles.greetingSection}>
        <View>
        <Text style={styles.greetingText}>Welcome to GarbageOut</Text>
        <Text style={styles.subText}>Have you taken out the trash today!</Text>
        </View>
        <TouchableOpacity disabled={isLoading} onPress={refetch} style={{width: 28,height: 28,marginRight:12, marginTop:20}}>
          {
          !isLoading?
          <Icon
            name="refresh-outline"
            size={24}
            style={{color:"white", fontWeight:"bold"}}
          />:
          <ActivityIndicator color={"white"} size={"small"} />
}
        </TouchableOpacity>
        
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total {"\n"}Schedules</Text>
          <Text style={styles.statValue}>{schedules?.length}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Pending {"\n"} Pickups</Text>
          <Text style={styles.statValue}>{pending()}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Successful {"\n"} Pickups</Text>
          <Text style={styles.statValue}>{pickedUp()}</Text>
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
                            <TouchableOpacity onPress={()=> navigation.navigate('PaidSubs', { data: shedule })} key={shedule?.schedule_id} style={styles.scheduleCard}>
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
                            
                                  <Text style={styles.binPrice}>{`GHC ${shedule?.price}`}</Text>
                              </View>
                            </TouchableOpacity>

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
