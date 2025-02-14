import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../../utils/config";
import { useUser } from "../../context/UserContext";

const { height } = Dimensions.get("window");

const LogIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { login } = useUser();

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!phoneNumber || phoneNumber?.length !== 9) {
      newErrors.phoneNumber = "Please enter a valid phone number";
      valid = false;
    }

    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    } 
    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
      if (validateForm()) {
    setLoading(true);

    const data = {
      phone: `+233${phoneNumber}`,
      password,
    };

    try {
      console.log("Sending request:", data); // Debugging log
      const url = `${BASE_URL}accounts/token/`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
          login(responseData);
        console.log("Response:", responseData)
        navigation.navigate("BottomTabNavigator");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        Alert.alert("Error", errorData.phone[0] || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.root} >
          <Image
            source={require("../../assets/Splash.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />

          <PhoneInput
            defaultValue={phoneNumber}
            defaultCode="GH"
            layout="first"
            onChangeText={setPhoneNumber}
            containerStyle={[
              styles.phoneInput,
              { borderColor: errors.phoneNumber ? "red" : "#34D186" },
            ]}
            textContainerStyle={styles.textInput}
            flagButtonStyle={styles.flagButton}
            textInputProps={{ placeholder: "Phone number" }}
            placeholderTextColor="#888"
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}

          <View style={styles.passwordContainer}>
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              borderColor={errors.password ? "red" : "#ccc"}
              iconName="lock-closed"
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#7D7D7D"
              style={styles.eyeIcon}
              onPress={toggleVisibility}
            />
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <Text
            style={styles.link}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot your password?
          </Text>

          <View style={styles.bottomSection}>
            <CustomButton
              onPress={handleLogin}
              text={loading ? "Processing..." : "Log In"}
              bg="#34D186"
              txt="white"
              disabled={loading}
            />
            <Text style={styles.text}>
              Don't have an account?{" "}
              <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  root: {
    alignItems: "center",
    padding: 20,
    marginTop: 100,
  },
  logo: {
    width: "80%",
    height: 200,
    marginTop: -70,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 25,
  },
  link: {
    color: "#34D186",
    alignSelf: "flex-end",
    marginBottom: 0,
    marginTop: 10,
  },
  bottomSection: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
    marginTop: 5
  },
  phoneInput: {
    width: "100%",
    height: 60,
    borderColor: "#34D186",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 10,
    paddingVertical: 0,
    backgroundColor: "transparent",
  },
});

export default LogIn;
