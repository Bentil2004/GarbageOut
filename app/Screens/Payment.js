import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const Payment = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  
  const payments = [
    { id: '1', date: '2024-10-01', amount: 'GHC120.00', status: 'Paid' },
    { id: '2', date: '2024-11-01', amount: 'GHC240.00', status: 'Upcoming' },
    { id: '3', date: '2024-10-01', amount: 'GHC520.00', status: 'Paid' },
  ];

  const filteredPayments = payments.filter(payment => payment.status === activeTab);

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.paymentRow} 
      onPress={() => {
        if (item.status === 'Upcoming') {
          navigation.navigate('ScheduleConfirmation');
        } else {
          navigation.navigate('PaidSubs');
        }
      }}
    >
      <Text style={styles.paymentDate}>{item.date}</Text>
      <Text style={styles.paymentAmount}>{item.amount}</Text>
      <Text style={[styles.paymentStatus, item.status === 'Upcoming' ? styles.upcoming : styles.paid]}>
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Payment transactions</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text style={styles.tabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Paid' && styles.activeTab]}
          onPress={() => setActiveTab('Paid')}
        >
          <Text style={styles.tabText}>Paid</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPayments}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.paymentList}
      />
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
    backgroundColor: '#55A57F',
    paddingHorizontal: 20,
    paddingVertical: 40,
    position: 'relative',
    height: 140,
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#EAEAEA',
  },
  activeTab: {
    backgroundColor: '#7C6DDD',
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentList: {
    paddingHorizontal: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentDate: {
    fontSize: 16,
    color: 'gray',
    flex: 1, 
    textAlign: 'left',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, 
    textAlign: 'left',
    paddingHorizontal: 25,
  },
  paymentStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, 
    textAlign: 'center',
  },
  upcoming: {
    color: '#FF9800',
  },
  paid: {
    color: '#34D186',
  },
});
