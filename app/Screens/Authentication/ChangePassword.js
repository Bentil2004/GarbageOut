import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../utils/config';

const ChangePassword = ({ route }) => {
  const navigation = useNavigation();
  const phoneNumber = route?.params?.phoneNumber || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      alert('Please fill in both fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(BASE_URL + 'accounts/reset-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      if (response.ok) {
        alert('Password updated successfully!');
        navigation.navigate('Login');
      } else {
        const data = await response.json();
        throw new Error(data || 'Password reset failed');
      }
    } catch (error) {
      alert(error.message || 'Something went wrong.');
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
        <Text style={styles.title}>Set a new password</Text>
        <Text style={styles.subtitle}>
          Create a new password. Ensure it differs from previous ones for security
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#34D186" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#34D186" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, (!password || !confirmPassword || loading) ? styles.buttonDisabled : styles.buttonActive]}
        onPress={handleUpdatePassword}
        disabled={!password || !confirmPassword || loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Password</Text>}
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
    top: 100,
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#34D186',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#34D186',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
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

export default ChangePassword;
