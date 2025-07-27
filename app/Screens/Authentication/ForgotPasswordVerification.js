import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BASE_URL } from "../../utils/config";
import CustomInput from "../../components/CustomInput";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordVerification = ({ route }) => {
  const { phoneNumber } = route.params || {};
    const navigation = useNavigation();
  

  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
    const [password, setPassword] = useState("");
  const inputRefs = useRef([]);
    const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleVerificationCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyCode = async () => {
  const code = verificationCode.join("");
  if (!password || !code) {
    Alert.alert("Error", "Please enter code and new password");
    } 

  const formattedPhone =
    phoneNumber.startsWith("0")
      ? "+233" + phoneNumber.slice(1)
      : phoneNumber;

  setLoading(true);

  try {
    const response = await fetch(`${BASE_URL}accounts/confirm-password-reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: formattedPhone,
        code: code,
        new_password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert("Success", "Password has been reset.");
      navigation.navigate("Login");
    } else {
      console.log("Reset error:", data);
      Alert.alert("Error", data?.detail || "Invalid code or password.");
    }
  } catch (error) {
    console.error("Network error:", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const resend = async () => {

    setResendLoading(true);
    setCanResend(false);
    setResendTimer(60);

    try {
      
      const response = await fetch(`${BASE_URL}accounts/request-password-reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (response.ok) {
        Alert.alert("SMS Sent", `A password reset code has been sent to ${phoneNumber}.`);
      } else {
        const data = await response.json();
        console.log(data);
        
        throw new Error(data?.detail || "Request failed");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={28} color="#55A57F" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Verify Your Phone Number</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your phone number
        </Text>
      </View>

      <View style={styles.otpContainer}>
        {[0, 1, 2, 3, 4].map((index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={verificationCode[index]}
            onChangeText={(value) => handleVerificationCodeChange(index, value)}
          />
        ))}
      </View>

      <View style={styles.passwordContainer}>
            <CustomInput
              placeholder="New Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              borderColor={"#ccc"}
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

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyText}>Verify Code</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={canResend ? resend : null} disabled={!canResend || resendLoading}>
        <Text style={[styles.resendText, { color: canResend ? "#55A57F" : "#ccc" }]}>
          {resendLoading
            ? "Sending..."
            : canResend
            ? "Resend Code"
            : `Resend in ${resendTimer}s`}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#55A57F",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    color: "#000",
  },
  verifyButton: {
    backgroundColor: "#55A57F",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resendText: {
    textAlign: "center",
    fontSize: 14,
    textDecorationLine: "underline",
    marginTop: 10,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 20,
    marginHorizontal:10
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 25,
  },
});

export default ForgotPasswordVerification;
