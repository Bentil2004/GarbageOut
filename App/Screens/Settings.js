import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.body}>
        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name="web" size={24} color="gray" />
          <Text style={styles.optionText}>Language</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name="shield-check-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Privacy Policy</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name="file-document-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Terms of Service</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name="information-outline" size={24} color="gray" />
          <Text style={styles.optionText}>About App</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name="headset" size={24} color="gray" />
          <Text style={styles.optionText}>Support Agent</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Delete Account</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name="logout" size={24} color="gray" />
          <Text style={styles.optionText}>Log Out</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
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
});
