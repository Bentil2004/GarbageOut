import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Payment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>GarbageOut balance</Text>
        <Text style={styles.balanceAmount}>GHC 0</Text>
        <Text style={styles.balanceInfo}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molest.</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.optionRow}>
          <MaterialCommunityIcons name="help-circle-outline" size={24} color="gray" />
          <Text style={styles.optionText}>What is GarbageOut balance ?</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="gray" />
          <Text style={styles.optionText}>See GarbageOut balance transactions</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Payment methods</Text>
      <View style={styles.paymentMethods}>
          <Text style={styles.methodTitle}>Mobile money</Text>
        <TouchableOpacity style={styles.paymentRow}>
          <View style={styles.mtnRow}>
            <Image source={require('../assets/logomtn.png')} style={styles.mtnLogo} />
            <Text style={styles.mtnText}>MTN</Text>
            <MaterialCommunityIcons name="check-circle" size={24} color="green" style={styles.checkIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentRow}>
          <MaterialCommunityIcons name="plus-circle-outline" size={24} color="gray" />
          <Text style={styles.optionText}>Add debit / credit card</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.iconRight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  balanceCard: {
    backgroundColor: '#E9EAED',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    height: 150,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'gray',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  balanceInfo: {
    fontSize: 14,
    color: 'gray',
  },
  options: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  paymentMethods: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  methodTitle: {
    fontSize: 18,
  },
  mtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  mtnLogo: {
    width: 50,
    height: 30,
    marginRight: 10,
    borderRadius: 6,
  },
  mtnText: {
    fontSize: 16,
    flex: 1,
  },
  checkIcon: {
    marginRight: 10,
  },
});
