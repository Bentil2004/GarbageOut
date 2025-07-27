
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
import { BASE_URL } from "../../utils/config";

const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const toggleVisibility = (field) => {
    if (field === "password") setShowPassword(!showPassword);
    if (field === "passwordRepeat") setShowPasswordRepeat(!showPasswordRepeat);
  };

  const validateForm = () => {
  let valid = true;
  const newErrors = {};

  let formattedPhone = phoneNumber;
  if (formattedPhone.startsWith("0")) {
    formattedPhone = "+233" + formattedPhone.slice(1);
  }

  if (!formattedPhone.startsWith("+233") || formattedPhone.length !== 13) {
    newErrors.phoneNumber = "Please enter a valid phone number starting with +233";
    valid = false;
  }

  if (valid) {
    console.log(formattedPhone);
    
    setPhoneNumber(formattedPhone);
  }

  if (!password) {
    newErrors.password = "Password is required";
    valid = false;
  } else {
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Must contain at least one uppercase letter";
      valid = false;
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Must contain at least one lowercase letter";
      valid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Must contain at least one digit";
      valid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Must contain at least one special character (!@#$%^&*)";
      valid = false;
    }
  }

  if (password !== passwordRepeat) {
    newErrors.passwordRepeat = "Passwords do not match";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};



  const handleSignUp = async () => {
  if (validateForm()) {
    setLoading(true);

    let formattedPhone = phoneNumber;
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "+233" + formattedPhone.slice(1);
    }

    const data = {
      phone: formattedPhone,
      password: password,
    };

    try {
      console.log("Sending request:", data);
      const url = `${BASE_URL}accounts/register/`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response:", responseData);
        navigation.navigate("Verification", { phoneNumber: formattedPhone });
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        Alert.alert(
          "Error",
          errorData.phone?.[0] ||
            errorData.password?.[0] ||
            "Something went wrong."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
};



  const onLoginPressed = () => {
    navigation.navigate("LogIn");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.root}>
          <Image
            source={require("../../assets/Splash.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.inputContainer}>
            <Ionicons name="call" size={24} color="#7D7D7D" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#ccc"
            />
          </View>

          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}

          <View style={styles.passwordInputContainer}>
            <CustomInput
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              borderColor={errors.password ? "red" : "#ccc"}
              borderRadius={15}
              iconName="lock-closed"
              accessibilityLabel="Password input field"
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#7D7D7D"
              style={styles.eyeIcon}
              onPress={() => toggleVisibility("password")}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <View style={styles.passwordInputContainer}>
            <CustomInput
              placeholder="Re-enter your password"
              value={passwordRepeat}
              onChangeText={setPasswordRepeat}
              secureTextEntry={!showPasswordRepeat}
              borderColor={errors.passwordRepeat ? "red" : "#ccc"}
              borderRadius={15}
              iconName="lock-closed"
              accessibilityLabel="Confirm password input field"
            />
            <MaterialCommunityIcons
              name={showPasswordRepeat ? "eye-off" : "eye"}
              size={24}
              color="#7D7D7D"
              style={styles.eyeIcon}
              onPress={() => toggleVisibility("passwordRepeat")}
            />
          </View>
          {errors.passwordRepeat && (
            <Text style={styles.errorText}>{errors.passwordRepeat}</Text>
          )}

          <CustomButton
            text={loading ? "Processing..." : "Submit"}
            onPress={handleSignUp}
            bg="#55A57F"
            txt="white"
            disabled={loading}
          />

          <Text style={styles.text}>
            Already have an account?{" "}
            <Text style={styles.link} onPress={onLoginPressed}>
              Log in
            </Text>
          </Text>
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
  },
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "80%",
    height: 200,
    marginTop: 20,
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
  },
  link: {
    color: "#55A57F",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  eyeIcon: {
    marginLeft: -35,
    marginTop: 10,
    marginHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
  },
  textInput: {
    borderRadius: 10,
    paddingVertical: 0,
    backgroundColor: "transparent",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#55A57F",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 60,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#000",
  },
});

export default SignUpScreen;
