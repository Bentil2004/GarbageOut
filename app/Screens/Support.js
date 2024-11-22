import { StyleSheet, Text, View, TouchableOpacity, Linking, Settings } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Support = ({ navigation }) => {
  const phoneNum = '+233556805991';

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNum}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack(Settings)}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Surpport Agent</Text>
      </View>
      <Text style={styles.supportText}>Need help? Contact our support team:</Text>
      <TouchableOpacity style={styles.phoneContainer} onPress={handleCall}>
        <Icon name="phone" size={24} color="#7C6DDD" style={styles.phoneIcon} />
        <Text style={styles.phoneNumber}>Call {phoneNum}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 150,
      backgroundColor:  '#55A57F',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      zIndex: 1000,
      padding: -50,
     
    },
    backButton: {
      position: 'absolute',
      right: 150,
      fontSize: 29,
      color: '#fff',
    },
    headerText: {
      fontSize: 29,
      fontWeight: 'bold',
      color: '#fff',
    },
    supportText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    phoneNumber: {
        fontSize: 20,
        color: '#7C6DDD',
        marginRight: 10,
    },
    phoneIcon: {
        marginRight: 15,
    },
});

export default Support;