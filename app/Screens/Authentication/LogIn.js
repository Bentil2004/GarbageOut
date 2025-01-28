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

const { height } = Dimensions.get("window");

const LogIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const validatePassword = (password) => password.length >= 8;

  const validateForm = () => {
    let isValid = true;

    if (!formattedValue || formattedValue.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "You have logged in successfully!");
        navigation.navigate("BottomTabNavigator");
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.root}>
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
            onChangeFormattedText={setFormattedValue}
            containerStyle={[
              styles.phoneInput,
              { borderColor: passwordError ? "red" : "#34D186" },
            ]}
            textContainerStyle={styles.textInput}
            flagButtonStyle={styles.flagButton}
            textInputProps={{ placeholder: "Phone number" }}
            placeholderTextColor="#888"
          />

          <View style={styles.passwordContainer}>
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              borderColor={passwordError ? "red" : "#ccc"}
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
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

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
    marginTop: 5,
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
