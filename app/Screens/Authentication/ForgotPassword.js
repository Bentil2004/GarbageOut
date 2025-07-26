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

  const validatePhone = (phone) => {
    const phoneRegex = /^\+233\d{9}$/; 
    return phoneRegex.test(phone);
  };

  const onContinuePressed = async () => {
    if (!validatePhone(phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(BASE_URL + 'accounts/request-password-reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: String(phone) }),
      });

      if (response.ok) {
        Alert.alert(
          'SMS Sent',
          `A password reset code has been sent to ${phone}.`,
          [{ text: 'OK', onPress: () => navigation.navigate('ForgotPasswordVerification', { phone }) }]
        );
      } else {
        const data = await response.json();
        throw new Error(data || 'Request failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message || 'Something went wrong.');
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
        <Ionicons name="arrow-back-outline" size={28} color="#34D186" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Please enter your phone number to reset the password</Text>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#34D186" style={styles.icon} />
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
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 150,
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
    color: '#34D186',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#34D186',
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
    backgroundColor: '#34D186',
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
