import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView ,ScrollView,KeyboardAvoidingView,Platform, Settings} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const DeleteAccount = ({ navigation }) => {
  const [reason, setReason] = useState('');

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            Alert.alert("Account deleted", "Your account has been successfully deleted.");
            navigation.navigate('PhoneVerification'); 
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
   <ScrollView 
       contentContainerStyle={styles.scrollContainer} 
       showsVerticalScrollIndicator={false}
       keyboardShouldPersistTaps="handled"
    >
    <SafeAreaView  style={styles.Top}>
        <TouchableOpacity onPress={() => navigation.goBack(Settings)}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.warning}>
        Deleting your account is permanent and {'\n'}cannot be undone. You will lose all your {'\n'}data.
      </Text>
      <Text style={styles.label}>Reason for deleting account (optional)</Text>
      <TextInput
        style={styles.textInput}
        value={reason}
        onChangeText={setReason}
        placeholder=""
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  backButton: {
    fontSize: 29,
    color: '#000',
    marginHorizontal: 20
  },
  title: {
    fontSize: 24,
    position: 'absolute',
    fontWeight: 'bold',
    marginBottom: 16,
    // textAlign: 'center',
    marginHorizontal: 100,
  },
  warning: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    top: 30,
    marginBottom: 16,
    color: 'red',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    alignSelf: 'center',
    top: 40,
  },
  textInput: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    top: 60,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
    margin: 15,
  },
  deleteButton: {
    backgroundColor: '#7C6DDD',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 5,
    marginVertical: 16,
    top: 60,
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  Top:{
    marginVertical: 80,
  }
});

export default DeleteAccount;
