import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable , ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const Settings = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { user, logout } = useUser();

  const onTermsPressed = () => {
    navigation.navigate('Terms');
  };

  const onPolicyPressed = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const onHelpPressed = () => {
    navigation.navigate('Help');
  };

  const onDeletePressed = () => {
    navigation.navigate('Delete');
  };

  const onAboutPressed = () => {
    navigation.navigate('About');
  };

  const onLogoutPressed = () => {
    setModalVisible(true); 
  };

  const confirmLogout = () => {
    setModalVisible(false);
    logout()
   navigation.navigate('LogIn')
  };

  const cancelLogout = () => {
    setModalVisible(false); 
  };

  const onLanguagechange = () => {
    navigation.navigate('LanguageChange');
  };

  const onSupportPressed = () => {
    navigation.navigate('Support');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <ScrollView style={styles.body}>
        <TouchableOpacity style={styles.row} onPress={onLanguagechange}>
          <MaterialCommunityIcons name="web" size={24} color="gray" />
          <Text style={styles.optionText}>Language</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={onPolicyPressed}>
          <MaterialCommunityIcons name="shield-check-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Privacy Policy</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={onTermsPressed}> 
          <MaterialCommunityIcons name="file-document-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Terms of Service</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={onAboutPressed}>
          <MaterialCommunityIcons name="information-outline" size={24} color="gray" />
          <Text style={styles.optionText}>About App</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={onSupportPressed}>
          <MaterialCommunityIcons name="headset" size={24} color="gray" />
          <Text style={styles.optionText}>Support Agent</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={onDeletePressed}>
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Delete Account</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={onLogoutPressed}>
          <MaterialCommunityIcons name="logout" size={24} color="gray" />
          <Text style={styles.optionText}>Log Out</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.button, styles.buttonConfirm]} onPress={confirmLogout}>
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonCancel]} onPress={cancelLogout}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingTop: 60,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: -30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: '#333',
  },
  iconRight: {
    paddingRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: 200,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 115,
    alignItems: 'center',
  },
  buttonConfirm: {
    backgroundColor: 'red',
  },
  buttonCancel: {
    backgroundColor: '#f0f0f0',
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
});
