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
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
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
    let newErrors = {};

    if (!formattedValue || formattedValue.length < 10) {
      newErrors.phoneNumber = "Please enter a valid phone number";
      valid = false;
    }

    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
      valid = false;
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
      valid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one digit";
      valid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Password must contain at least one special character";
      valid = false;
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

      const data = {
        phone_number: formattedValue,
        password: password,
      };

      try {
        const response = await axios.post(
          "https://garbageout.pythonanywhere.com/accounts/register/",
          data
        );

        if (response.status === 201) {
          Alert.alert(
            "Success",
            "Registration successful! Please verify your account."
          );
          navigation.navigate("Verification"); 
        } else {
          Alert.alert("Error", "Something went wrong. Please try again.");
        }
      } catch (error) {
        if (error.response) {
          Alert.alert("Error", error.response.data.message || "Failed to register.");
        } else {
          Alert.alert("Error", "Network error. Please check your connection.");
        }
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
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

          <PhoneInput
            defaultValue={phoneNumber}
            defaultCode="GH"
            layout="first"
            onChangeText={setPhoneNumber}
            onChangeFormattedText={setFormattedValue}
            containerStyle={[
              styles.phoneInput,
              errors.phoneNumber && { borderColor: "red" },
            ]}
            textContainerStyle={styles.textInput}
            flagButtonStyle={styles.flagButton}
            textInputProps={{ placeholder: "Phone number" }}
            placeholderTextColor="#888"
          />
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
            text={loading ? "Processing..." : "Next"}
            onPress={handleSignUp}
            bg="#34D186"
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
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
  },
  link: {
    color: "#34D186",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  phoneInput: {
    width: "100%",
    height: 60,
    borderColor: "#34D186",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  textInput: {
    borderRadius: 10,
    paddingVertical: 0,
    backgroundColor: "transparent",
  },
});

export default SignUpScreen;
