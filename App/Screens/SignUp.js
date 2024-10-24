import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React, { useState } from "react";
import CheckBox from "react-native-check-box";
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

    const navigation = useNavigation();

    const onNextPressed = () => {
        navigation.navigate('BottomTabNavigator')
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../assets/Splash.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.inputContainer}>
            <TextInput placeholder="First name" placeholderTextColor="#888" style={styles.input} />
            <TextInput placeholder="Last name" placeholderTextColor="#888" style={styles.input} />
          </View>

          <TouchableOpacity style={styles.button} onPress={onNextPressed}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>

          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxRow}>
              <CheckBox
                isChecked={isTermsAccepted}
                onClick={() => setIsTermsAccepted(!isTermsAccepted)}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxText}>
                I accept the <Text style={styles.linkText}>Terms and Conditions</Text>.
              </Text>
            </View>
            <View style={styles.checkboxRow}>
              <CheckBox
                isChecked={isNotificationsEnabled}
                onClick={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxText}>I want regular notifications</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 200,
  },
  logo: {
    width: "80%",
    height: "80%",
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    width: 351,
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderColor: "#ccc",
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#34D186",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  checkboxContainer: {
    width: "90%",
    alignItems: "flex-start",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  linkText: {
    color: "#34D186",
  },
});
