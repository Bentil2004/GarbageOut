import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../../utils/config';

const ForgotPasswordPhone = () => {
  const navigation = useNavigation();
  return <ForgotPassword navigation={navigation} />;
};

const ForgotPassword = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhone = () => {
    let valid = true;

  let formattedPhone = phone;
  if (phone.startsWith("0")) {
    formattedPhone = "+233" + phone.slice(1);
  }

  if (!formattedPhone.startsWith("+233") || formattedPhone.length !== 13) {
    valid = false;
  } else {
    setPhone(formattedPhone);
  }
  return valid
  };

  const onContinuePressed = async () => {
    if (!validatePhone()) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number starting with +233.');
      return;
    }

    let formattedPhone = phone;
  if (phone.startsWith("0")) {
    formattedPhone = "+233" + phone.slice(1);
  }

  if (!formattedPhone.startsWith("+233") || formattedPhone.length !== 13) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number starting with +233.');
      return
  } else {
    setPhone(formattedPhone);
  }

    setLoading(true);
    
    try {
      const response = await fetch(BASE_URL + 'accounts/request-password-reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: String(formattedPhone) }),
      });

      if (response.ok) {
        Alert.alert(
          'SMS Sent',
          `A password reset code has been sent to ${phone}.`,
          [{ text: 'OK', onPress: () => navigation.navigate('ForgotPasswordVerification', { phoneNumber: formattedPhone }) }]
        );
      } else {
        const data = await response.json();
        console.log(data);
      Alert.alert('Error', data.phone[0] || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.phone[0] || 'Something went wrong.');
    } finally {
      setLoading(false);
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
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Please enter your phone number to reset the password</Text>
      </View>

      <View style={styles.inputContainer}>
                  <Ionicons name="call" size={24} color="#7D7D7D" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#A0A0A0"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, phone.length === 0 || loading ? styles.buttonDisabled : styles.buttonActive]}
        onPress={onContinuePressed}
        disabled={phone.length === 0 || loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Proceed</Text>}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 80,
    // justifyContent: 'cen',
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    // color: '#55A57F',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#55A57F',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 30,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#55A57F',
  },
  buttonDisabled: {
    backgroundColor: '#A7F3D0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordPhone;
