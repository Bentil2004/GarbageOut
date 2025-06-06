import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { BASE_URL } from "../utils/config";
import { useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

const MobileMoneyPayment = ({
  scheduleId,
  onSuccess,
  onCancel,
  styles,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
    const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!phone) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    setLoading(true);

    try {
      console.log({
          phone,
          schedule_id: scheduleId,
        })
      const response = await fetch(BASE_URL+"payments/initiate-payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.access}`,
        },
        body: JSON.stringify({
          phone,
          schedule_id: scheduleId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || "Payment initiation failed");
      }

      setIsVisible(false);
      setPhone("");
      onSuccess?.(data);
    } catch (error) {
      console.error("Payment Error:", error);
      onCancel?.(error);
      Alert.alert("Payment Failed", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles?.scheduleButtonContainer}>

      <TouchableOpacity style={styles.scheduleButtonL} onPress={() => navigation.navigate("BottomTabNavigator",{screen: "Payment",})}>
              <Text style={styles?.scheduleButtonText}>Pay later</Text>
            </TouchableOpacity>

      <TouchableOpacity
        style={styles?.scheduleButton}
        onPress={() => setIsVisible(true)}
        disabled={loading}
      >
        <Text style={styles?.scheduleButtonText || { color: "#fff" }}>
          Pay Now
        </Text>
      </TouchableOpacity>

      <Modal visible={isVisible} animationType="slide" transparent>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Mobile Money Payment</Text>

            <TextInput
              style={modalStyles.input}
              placeholder="Phone Number"
              placeholderTextColor={"gray"}
              keyboardType="number-pad"
              value={phone}
              onChangeText={setPhone}
              editable={!loading}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <View style={modalStyles.buttonRow}>
                <TouchableOpacity
    style={[modalStyles.modalButton, { backgroundColor: "#aaa" }]}
    onPress={() => setIsVisible(false)}
  >
    <Text style={[modalStyles.buttonText, { color: "#fff" }]}>Cancel</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[modalStyles.modalButton, { backgroundColor: "#34D186" }]}
    onPress={handleSubmit}
  >
    <Text style={modalStyles.buttonText}>Submit</Text>
  </TouchableOpacity>
</View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "90%",
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});


export default MobileMoneyPayment;

