import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable , ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';


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

  const onNotificationPressed = () => {
    navigation.navigate('Notification');
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>View and update your app settings</Text>
        {/* <TouchableOpacity onPress={onNotificationPressed} style={styles.notificationIconWrapper}>
            <Icon name="notifications-outline" size={24} style={styles.notificationIcon} />
          </TouchableOpacity> */}

      </View>

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
      <Text style={styles.modalTitle}>Log Out</Text>
      <Text style={styles.modalText}>Are you sure you want to log out?</Text>
      <View style={styles.modalButtons}>
        <Pressable style={[styles.button, styles.buttonCancel]} onPress={cancelLogout}>
          <Text style={styles.buttonCancelText}>Cancel</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonConfirm]} onPress={confirmLogout}>
          <Text style={styles.buttonConfirmText}>Log Out</Text>
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
    backgroundColor: '#55A57F',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative',
    zIndex: 1000
  },
 title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 0,
    marginTop: 15,
  }, 
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  notificationIconWrapper: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  notificationIcon: {
    color: 'white',
    paddingTop: 10
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 40,
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
  backgroundColor: '#fff',
  borderRadius: 15,
  paddingVertical: 30,
  paddingHorizontal: 25,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 5,
  width: '85%',
},
modalTitle: {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 10,
  color: '#333',
},
modalText: {
  fontSize: 16,
  color: '#555',
  textAlign: 'center',
  marginBottom: 25,
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
button: {
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 20,
  elevation: 2,
  minWidth: '45%',
  alignItems: 'center',
},
buttonConfirm: {
  backgroundColor: '#d9534f',
},
buttonCancel: {
  backgroundColor: '#e0e0e0',
},
buttonConfirmText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 16,
},
buttonCancelText: {
  color: '#333',
  fontWeight: '600',
  fontSize: 16,
},
});
