import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import CheckBox from "react-native-check-box";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_FIRESTORE } from "../../../backend/FirebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnbordSignUp = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onNextPressed = async () => {
    if (firstName === "" || lastName === "") {
      alert("Please fill in both first name and last name.");
      return;
    }

    setLoading(true); 
    try {
      const uid = await AsyncStorage.getItem("uid",uid);

      if (!uid) {
        console.error("UID not found");
        setLoading(false); 
        return;
      }

      const userData = {
        customer_id: uid,
        first_name: firstName,
        last_name: lastName,
        created_at: new Date(),
        updated_at: new Date(),
        is_terms_accepted: isTermsAccepted,
        is_notifications_enabled: isNotificationsEnabled,
      };

      const customersCollection = collection(FIREBASE_FIRESTORE, "customers");
      const customerDocRef = doc(customersCollection, uid);

      await setDoc(customerDocRef, userData);

      navigation.navigate("BottomTabNavigator");
    } catch (error) {
      console.error("Error saving user data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onTermsPressed = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");

      if (!uid) {
        console.error("UID not found");
        return;
      }

      const userData = {
        customer_id: uid,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const customersCollection = collection(FIREBASE_FIRESTORE, "customers");
      const customerDocRef = doc(customersCollection, uid);

      await setDoc(customerDocRef, userData);

      navigation.navigate("Terms");
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/Splash.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First name"
            placeholderTextColor="#888"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last name"
            placeholderTextColor="#888"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

   
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={onNextPressed}
          disabled={loading} 
        >
          <Text style={styles.buttonText}>
            {loading ? "Processing..." : "Next"}
          </Text>
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxRow}>
            <CheckBox
              isChecked={isTermsAccepted}
              onClick={() => setIsTermsAccepted(!isTermsAccepted)}
              style={styles.checkbox}
            />
            <TouchableOpacity onPress={onTermsPressed}>
              <Text style={styles.checkboxText}>
                I accept the{" "}
                <Text style={styles.linkText}>Terms and Conditions</Text>.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxRow}>
            <CheckBox
              isChecked={isNotificationsEnabled}
              onClick={() =>
                setIsNotificationsEnabled(!isNotificationsEnabled)
              }
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>
              I want regular notifications
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OnbordSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  logo: {
    width: "80%",
    height: 200,
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
