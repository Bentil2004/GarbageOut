import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../backend/FirebaseConfig'; 

const ForgotPasswordEmail = () => {
  const navigation = useNavigation();
  return <ForgotPassword navigation={navigation} />;
};

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onContinuePressed = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      const auth = getAuth(FIREBASE_AUTH);
      await sendPasswordResetEmail(auth, email, {
        url: "https://garbageout-6d502.firebaseapp.com", 
        handleCodeInApp: true,
      });

      Alert.alert(
        "Email Sent",
        `A password reset link has been sent to ${email}. Please check your inbox.`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    } catch (error) {
      let errorMessage = "Something went wrong.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      }
      Alert.alert("Error", errorMessage);
    }
  };

  const isEmailEmpty = email.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Please enter your email to reset the password</Text>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#707070" style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#707070"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isEmailEmpty ? styles.buttonInitial : styles.buttonFilled]}
          onPress={onContinuePressed}
          disabled={isEmailEmpty}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    color: '#34D186',
    fontSize: 20,
    marginTop: 30
  },
  container: {
    marginTop: 80,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: 20,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    top: 10,
    textAlign: 'left',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonInitial: {
    backgroundColor: '#A7F3D0',
  },
  buttonFilled: {
    backgroundColor: '#34D186',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ForgotPasswordEmail;
