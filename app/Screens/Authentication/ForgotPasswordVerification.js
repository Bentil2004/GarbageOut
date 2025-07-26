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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ForgotPasswordVerification = ({ route, navigation }) => {
  const { phoneNumber } = route.params || {}; 

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    ]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleVerificationCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyCode = () => {
    setLoading(true);
    const code = verificationCode.join("");
    console.log("Verification Code:", code);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("ChangePassword", { phoneNumber });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={28} color="#34D186" />
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

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyText}>Verify Code</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.resendText}>Resend Code</Text>
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
    top: 100,
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
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#34D186",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    color: "#000",
  },
  verifyButton: {
    backgroundColor: "#34D186",
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
    color: "#34D186",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default ForgotPasswordVerification;
