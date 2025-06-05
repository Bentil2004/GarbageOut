import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const About = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>About GarbageOut</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.updateDate}>Last updated: July 05, 2024</Text>
        
        <Text style={styles.paragraph}>
          Welcome to <Text style={{ fontWeight: 'bold' }}>GarbageOut</Text> — the easiest way to manage your household or business waste pickups. With just a few taps, you can schedule trash collection, make secure payments, and track the status of your requests all from your phone.
        </Text>

        <Text style={styles.heading}>What is GarbageOut?</Text>
        <Text style={styles.paragraph}>
          GarbageOut is a waste management mobile application that connects residents and businesses with licensed garbage collection services. We help make trash disposal simple, affordable, and reliable.
        </Text>

        <Text style={styles.heading}>Key Features</Text>
        <Text style={styles.listItem}>• Schedule pickups for household or business waste</Text>
        <Text style={styles.listItem}>• Pay securely within the app using mobile money or card</Text>
        <Text style={styles.listItem}>• Track upcoming and completed pickups</Text>
        <Text style={styles.listItem}>• Get reminders and notifications so you never miss collection day</Text>
        <Text style={styles.listItem}>• View your pickup history and receipts</Text>

        <Text style={styles.heading}>Why Use GarbageOut?</Text>
        <Text style={styles.paragraph}>
          We created GarbageOut to eliminate the inconvenience of irregular trash pickup and the hassle of unverified collection agents. Our platform ensures your waste is collected on time, transparently, and responsibly.
        </Text>
        <Text style={styles.listItem}>• Save time with scheduled pickups</Text>
        <Text style={styles.listItem}>• Avoid health hazards and overflowing bins</Text>
        <Text style={styles.listItem}>• Support eco-friendly and approved disposal practices</Text>

        <Text style={styles.heading}>Service Areas</Text>
        <Text style={styles.paragraph}>
          GarbageOut is currently available in select regions across Ghana. We’re expanding to more areas soon—stay tuned!
        </Text>

        <Text style={styles.heading}>Support & Contact</Text>
        <Text style={styles.paragraph}>
          Have questions or need help? Contact our support team:
        </Text>
        <Text style={styles.listItem}>• Email: garbageout@gmail.com</Text>
        <Text style={styles.listItem}>• Phone: +233 20 000 0000</Text>

        <Text style={styles.heading}>Terms & Policies</Text>
        <Text style={styles.paragraph}>
          By using GarbageOut, you agree to our Terms of Service and Privacy Policy. These outline your rights, responsibilities, and how we handle your data.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 123,
    backgroundColor: '#55A57F',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1000,
    paddingBottom: 20,
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
  contentContainer: {
    paddingTop: 170,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  updateDate: {
    fontSize: 19,
    color: 'black',
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'justify',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'justify',
  },
});

export default About;
