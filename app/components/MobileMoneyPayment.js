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
              <>
                <TouchableOpacity
                  style={modalStyles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Submit Payment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Text style={{ marginTop: 10, color: "red" }}>Cancel</Text>
                </TouchableOpacity>
              </>
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
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "90%",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "green",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
});

export default MobileMoneyPayment;

