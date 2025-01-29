import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const PhoneNumberVerificationScreen = ({ route, navigation }) => {
  const phoneNumber = route?.params?.phoneNumber || ""; 

  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
        }
        return prevTimer > 0 ? prevTimer - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerificationCodeChange = (index, value) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (value !== "" && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyCode = () => {
    setLoading(true);

    const code = verificationCode.join("");
    console.warn("Verification code entered:", code);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("LogIn");
    }, 1000);
  };

  const handleResend = () => {
    console.warn("Resend verification code");
    setTimer(60);
  };

  const onEditPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <Text style={styles.title}>Enter code</Text>
      <Text style={styles.subtitle}>
        An SMS code was sent to <Text style={styles.num}>{phoneNumber}</Text>
      </Text>

      <TouchableOpacity onPress={onEditPressed}>
        <Text style={styles.editNumberText}>Edit phone number</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        {verificationCode.map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={verificationCode[index]}
            onChangeText={(value) => handleVerificationCodeChange(index, value)}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.timer}>
          {timer === 0 ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend</Text>
            </TouchableOpacity>
          ) : (
            `Resend code in ${timer} seconds`
          )}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20, 
  },
  title: {
    fontSize: 29,
    fontWeight: '600', 
    marginBottom: 8, 
  },
  subtitle: {
    fontSize: 15, 
    color: 'gray',
    marginBottom: 8,
  },
  editNumberText: {
    color: '#34D186',
    fontSize: 15, 
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    width: 64,
    height: 60, 
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#34D186',
    borderRadius: 10, 
    marginHorizontal: 3, 
    backgroundColor: '#f5f5f5',
  },
  timer: {
    color: 'gray',
    marginBottom: 20,
    fontSize: 14, 
  },
  resendText: {
    color: '#34D186',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#34D186',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  num: {
    color: '#000',
    fontWeight: '500',
  },
  footer: {
    justifyContent: 'flex-end',
    marginTop: 50,
  },
});

export default PhoneNumberVerificationScreen;
