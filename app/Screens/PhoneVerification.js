import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import PhoneInput from 'react-native-phone-number-input'
import { useNavigation } from '@react-navigation/native';

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  const navigation = useNavigation();

  const onContinuePressed = () => {
    navigation.navigate('Verification');
  }  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter your number</Text>
          <Text style={styles.subTitle}>We will send a code to verify your mobile number</Text>

          <View style={styles.phoneInputContainer}>
            <PhoneInput
              defaultValue={phoneNumber}
              defaultCode="GH"
              layout="first"
              onChangeText={setPhoneNumber}
              onChangeFormattedText={setFormattedValue}
              containerStyle={styles.phoneInput}
              textContainerStyle={styles.textInput}
              flagButtonStyle={styles.flagButton}
              textInputProps={{ placeholder: "Phone number" }}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.googleLogin}>Log in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onContinuePressed}>
              <Text style={styles.buttonText} >CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default PhoneVerification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  phoneInputContainer: {
    marginBottom: 20,
  },
  phoneInput: {
    width: '100%',
    height: 60,
    borderColor: '#55A57F',
    borderWidth: 1,
    borderRadius: 10,
  },
  textInput: {
    borderRadius: 10,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  flagButton: {
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#55A57F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleLogin: {
    color: '#34C759',
    fontSize: 16,
    marginBottom: 20,
  },
  footer: {
    marginTop: 50,
  },
});
