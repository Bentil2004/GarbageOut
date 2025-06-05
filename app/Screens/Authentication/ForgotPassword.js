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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../utils/config';

const ForgotPasswordPhone = () => {
  const navigation = useNavigation();
  return <ForgotPassword navigation={navigation} />;
};

const ForgotPassword = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhone = (phone) => {
  const phoneRegex = /^\+233\d{9}$/; // Ghana phone number: +233 followed by 9 digits
  return phoneRegex.test(phone);
};

  const onContinuePressed = async () => {
    if (!validatePhone(phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(BASE_URL+'accounts/request-password-reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: String(phone) }),
      });

      if (response.ok) {
        Alert.alert(
          'SMS Sent',
          `A password reset code has been sent to ${phone}.`,
          [{ text: 'OK', onPress: () => navigation.navigate('SetNewPassword', { phone }) }]
        );
      } else {
        const data = await response.json();
        throw new Error(data || 'Request failed');
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const isPhoneEmpty = phone.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your phone number to reset your password</Text>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#707070" style={styles.icon} />
          <TextInput
            placeholder="+233xxx"
            placeholderTextColor="#707070"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            isPhoneEmpty || loading ? styles.buttonInitial : styles.buttonFilled,
          ]}
          onPress={onContinuePressed}
          disabled={isPhoneEmpty || loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    marginTop: 30,
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

export default ForgotPasswordPhone;
