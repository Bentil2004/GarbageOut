import React from "react";
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

const Home = () => {
  const navigation = useNavigation();

  const upcomingPickups = [
    { id: 1, date: "24th Fri", time: "09:00 PM" },
    { id: 2, date: "25th Sat", time: "10:00 AM" },
    { id: 3, date: "26th Sun", time: "06:00 PM" },
  ];

  const onNotificationPressed = () => {
    navigation.navigate("Notification");
  };

  const onSchedulePressed = () => {
    navigation.navigate("Schedule");
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingSection}>
        <Text style={styles.greetingText}>Hello Fiifi</Text>
        <Text style={styles.subText}>Have you taken out the trash today!</Text>
        <TouchableOpacity onPress={onNotificationPressed}>
          <Icon
            name="notifications-outline"
            size={24}
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total {"\n"}Pickups</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Missed {"\n"} Pickups</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Wallet {"\n"} Balance</Text>
          <Text style={styles.statValue}>GHC 0</Text>
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
        <Text style={styles.sectionTitle}>UPCOMING PICKUP</Text>

        {upcomingPickups.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {upcomingPickups.map((pickup) => (
              <View key={pickup.id} style={styles.pickupCard}>
                <Image
                  source={require("../assets/truck.png")}
                  style={styles.truckIcon}
                />
                <View>
                  <Text style={styles.pickupDate}>{pickup.date}</Text>
                  <Text style={styles.pickupTime}>
                    <Icon name="time-outline" size={16} color="#7C6DDD" />{" "}
                    {pickup.time}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.animationContainer}>
            <LottieView
              source={require("../assets/out.json")}
              autoPlay
              loop = {false}
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
