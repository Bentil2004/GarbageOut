import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../context/UserContext';
import { useSchedules } from '../context/SchedulesContext';
import { BASE_URL } from '../utils/config';


const Payment = () => {
  const navigation = useNavigation();
  const { user } = useUser();
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
      const response = await fetch(`${BASE_URL}/schedules/schedule-pickup/`, {
        headers: {
          Authorization: `Bearer ${user?.access}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData)
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

  const filteredPayments = schedules.filter(item => item?.payment?.payed === paid);

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity 
      key={item?.schedule_id} style={styles.scheduleCard} 
 onPress={() => {
        if (item?.payment?.payed != true) {
          navigation.navigate('ScheduleConfirmation', {data: item});
        } else {
          navigation.navigate('PaidSubs');
        }
      }}
    >
     
                <Image source={require('../assets/schedule.png')} style={styles.binImage} />
                <View style={styles.binDetails}>
                <Text style={styles.scheduleDate}>{item?.location?.name}</Text>
                <Text style={styles.scheduleTime}>{item?.subscription?.subscription_name}</Text>
                  {item?.subscription?.schedules && item?.subscription?.schedules .length > 0 && (
                  <Text style={styles.scheduleTime}>
                    {"Pickup date on "}
                    {item?.subscription?.schedules?.map((schedule, idx) => (
                      <Text key={schedule.id}>
                        {schedule.day_of_the_month}
                        {getOrdinalSuffix(schedule.day_of_the_month)}
                        {idx < item?.subscription?.schedules.length - 1 ? ", " : ""}
                      </Text>
                    ))}
                  </Text>
                )} 

                  <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.binPrice}>{`GHC ${item?.payment?.amount}`}</Text>
                  <Text style={[styles.status, {color: `${item?.payment?.payed ? '#55A57F' :"red"}`, backgroundColor: `${item?.payment?.payed ? '#55A57F30' :"#ff000030"}`, padding: 5, borderRadius: 10, paddingHorizontal: 10} ]}>{item?.payment?.payed ? 'Paid' : 'Not paid'}</Text>
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
        <TouchableOpacity onPress={onNotificationPressed} style={styles.notificationIconWrapper}>
            <Icon name="notifications-outline" size={24} style={styles.notificationIcon} />
          </TouchableOpacity>
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

      <FlatList
        data={filteredPayments}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.paymentList}
        ListEmptyComponent={renderEmpty}
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
    color: '#34D186',
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  binImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  binDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scheduleDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  binInfo: {
    fontSize: 12,
    color: '#777',
  },
  binPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34D186',
  },

});
