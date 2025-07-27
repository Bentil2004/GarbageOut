import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { useUser } from '../context/UserContext';
import { useSchedules } from '../context/SchedulesContext';
import { BASE_URL } from '../utils/config';
import * as SecureStore from "expo-secure-store";


const Payment = () => {
  const navigation = useNavigation();
  const { logout } = useUser();
  const { schedules, setSchedules } = useSchedules()
  const [isLoading, setIsLoading] = useState(false);


  const [activeTab, setActiveTab] = useState('NotPaid');
  const [paid, setPaid] = useState(false)
   const onNotificationPressed = () => {
    navigation.navigate('Notification');
  };

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const fetchSchedules = async () => {
    try {
      console.log('fetching')
      setIsLoading(true);
      const token = await SecureStore.getItemAsync("access_token");
      const response = await fetch(`${BASE_URL}/schedules/schedule-pickup/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData)
        if(errorData["code"] == "token_not_valid"){
          logout()
        }
      }

      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setSchedules(sortedData)
      console.log('sorted: ',sortedData)
    } catch (error) {
      console.error("Fetch pickup error:", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchSchedules()
      }, []);

      const handleRefresh = () => {
    fetchSchedules()
  }

  const filteredPayments = schedules.filter(item => item?.has_payed == paid);

  const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};


  const renderPaymentItem = ({ item }) => (
  <TouchableOpacity 
    key={item?.schedule_id} 
    style={styles.scheduleCard}
    onPress={() => {
      if (item?.has_payed !== true) {
        navigation.navigate('ScheduleConfirmation', { data: item });
      } else {
        navigation.navigate('PaidSubs', { data: item });
      }
    }}
  >
    <Image source={require('../assets/schedule.png')} style={styles.binImage} />
    
    <View style={styles.binDetails}>
      <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
  <Text style={styles.scheduleDate}>{item?.location?.name}</Text>
  <Text style={styles.updatedText}>
    {formatDate(item.last_updated)}
    </Text>
  </View>
  <Text style={styles.scheduleTime}>{item?.subscription?.subscription_name}</Text>

  {item?.subscription?.schedules?.length > 0 && (
    <Text style={styles.scheduleTime}>
      Pickup date on{" "}
      {item.subscription.schedules.map((schedule, idx) => (
        <Text key={schedule.id}>
          {schedule.day_of_the_month}
          {getOrdinalSuffix(schedule.day_of_the_month)}
          {idx < item.subscription.schedules.length - 1 ? ", " : ""}
        </Text>
      ))}
    </Text>
  )}

  <View style={styles.priceStatusContainer}>
    <Text style={styles.binPrice}>{`GHC ${item?.price}`}</Text>
    <View
      style={[
        styles.statusBadge,
        {
          backgroundColor: item?.has_payed ? '#DFF3EB' : '#FFE3E3',
        },
      ]}
    >
      <Text
        style={{
          color: item?.has_payed ? '#2E7D4F' : '#D32F2F',
          fontWeight: '600',
          fontSize: 12,
        }}
      >
        {item?.has_payed ? 'Paid' : 'Not Paid'}
      </Text>
    </View>
  </View>
</View>

  </TouchableOpacity>
);


  const renderEmpty = () =>(
    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 32, color: 'gray', marginTop: 40}}>Empty</Text>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment transactions</Text>
        <Text style={styles.subtitle}>View and complete all payment transactions</Text>
        {/* <TouchableOpacity onPress={onNotificationPressed} style={styles.notificationIconWrapper}>
            <Icon name="notifications-outline" size={24} style={styles.notificationIcon} />
          </TouchableOpacity> */}
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'NotPaid' && styles.activeTab]}
          onPress={() => {setActiveTab('NotPaid'); setPaid(false)}}
        >
          <Text style={[styles.tabText, activeTab === 'NotPaid' && styles.activeTabText]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Paid' && styles.activeTab]}
          onPress={() => {setActiveTab('Paid'); setPaid(true)}}
        >
          <Text style={[styles.tabText, activeTab === 'Paid' && styles.activeTabText]}>Paid</Text>
        </TouchableOpacity>
      </View>

      <ScrollView refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={handleRefresh}
                  tintColor={"black"}
                />} style={{flexGrow:1}}>
      <FlatList
        data={filteredPayments}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.paymentList}
        ListEmptyComponent={renderEmpty}
      />
      </ScrollView>
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
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative',
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
    color: '#7c6ddd'
  },
  activeTab: {
    backgroundColor: '#7C6DDD',
    color: 'white' 
  },
  activeTabText: {
    color:'white'
  },
  tabText: {
    color: '#7c6ddd',
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
    color: '#55A57F',
  },
  scheduleCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 12,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},

binImage: {
  width: 60,
  height: 60,
  borderRadius: 10,
  marginRight: 16,
},

binDetails: {
  flex: 1,
  justifyContent: 'center',
},

scheduleDate: {
  fontSize: 16,
  fontWeight: '600',
  color: '#222',
  marginBottom: 4,
},

scheduleTime: {
  fontSize: 14,
  color: '#666',
  marginBottom: 3,
},

binPrice: {
  fontSize: 15,
  fontWeight: '700',
  color: '#2E7D4F',
},

priceStatusContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
},

statusBadge: {
  borderRadius: 20,
  paddingVertical: 4,
  paddingHorizontal: 12,
},
updatedText: {
  fontSize: 12,
  color: '#888',
  marginTop: 4,
},
});
