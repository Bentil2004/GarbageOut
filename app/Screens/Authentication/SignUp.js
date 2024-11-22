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
import { useNavigation } from "@react-navigation/native";
import { validate } from "email-validator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../backend/FirebaseConfig"; 


const SignUpScreen = () => {
  const [email, setEmail] = useState("");
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

    if (!validate(email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    if (passwordRepeat.length < 8) {
      newErrors.passwordRepeat = "Password must be at least 8 characters long";
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
      try {
        const userCredential = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        const user = userCredential.user;
        Alert.alert("Success", "You have successfully signed up!");
        navigation.navigate("OnbordSignUp", { userId: user.uid });
      } catch (error) {
        let errorMessage = "Something went wrong"; 
  
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "This email is already in use. Please use a different email.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "The email address is not valid.";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "The password is too weak. Please use a stronger password.";
        }
  
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    }
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

          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            bordercolor={errors.email ? "red" : "#ccc"}
            borderRadius={15}
            iconName="mail"
            accessibilityLabel="Email input field"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.passwordInputContainer}>
            <CustomInput
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              bordercolor={errors.password ? "red" : "#ccc"}
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
              bordercolor={errors.passwordRepeat ? "red" : "#ccc"}
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
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("LogIn")}
            >
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
    marginBottom: 0,
  },
  eyeIcon: {
    marginLeft: -35,
    marginTop: -10,
    marginHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
  },
});

export default SignUpScreen;
