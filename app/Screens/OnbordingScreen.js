import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const screens = [
  {
    image: require("../assets/onbord4.png"),
    bottomText:
      "Welcome to GarbageOut! Easily schedule your trash pickup right from your phone—no more missed collection days.",
  },
  {
    image: require("../assets/onbord5.png"),
    bottomText:
      "Track and manage your waste pickups, get reminders, and keep your home and environment clean with ease.",
  },
  {
    image: require("../assets/onbord6.png"),
    bottomText:
      "Securely pay for trash collection services in just a few taps. Fast, reliable, and hassle-free with GarbageOut.",
  },
];


const OnbordingScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % screens.length;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
    </View>
  );

  return (
    <LinearGradient colors={["#fff", "#fff"]} style={styles.container}>
      <FlatList
        data={screens}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        contentContainerStyle={styles.flatListContent}
        scrollEventThrottle={16}
      />

      <View style={styles.bottomTextContainer}>
        {screens[currentIndex] && (
          <Text style={styles.bottomText}>
            {screens[currentIndex].bottomText}
          </Text>
        )}
      </View>

      <View style={styles.indicatorContainer}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: index === currentIndex ? "#000" : "#C0C0C0",
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (currentIndex === screens.length - 1) {
              navigation.navigate("SignUp");
            } else {
              const nextIndex = currentIndex + 1;
              flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
              setCurrentIndex(nextIndex);
            }
          }}
        >
          <Text style={styles.buttonText}>
            {currentIndex === screens.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    paddingHorizontal: 0,
  },
  slide: {
    width,
    height: height * 0.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#55A57F",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  image: {
    width: "80%",
    height: "60%",
  },
  bottomTextContainer: {
    width: "100%",
    paddingHorizontal: 30,
    alignItems: "center",
    paddingVertical: 20,
    bottom: "30%",
  },
  bottomText: {
    textAlign: "center",
    color: "#000",
    fontSize: 18,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 12,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#34D186",
    padding: 16,
    borderRadius: 8,
    width: 337,
    height: 55,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    alignSelf: "center",
    bottom: 120,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default OnbordingScreen;
