import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Settings } from 'react-native';

const LanguageChange = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack(Settings)}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Language Settings</Text>
      </View>
      <Text style={styles.title}>Select Language</Text>
      <TouchableOpacity
        style={styles.radioContainer}
        onPress={() => setSelectedLanguage('English')}
      >
        <View style={styles.radioCircle}>
          {selectedLanguage === 'English' && <View style={styles.selectedRb} />}
        </View>
        <Text style={styles.languageText}>English</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#7C6DDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7C6DDD',
  },
  languageText: {
    fontSize: 18,
    color: '#000',
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
});
