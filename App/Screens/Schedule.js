import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('17');
  const [binCount, setBinCount] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [repeatOption, setRepeatOption] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  const navigation = useNavigation();

  const onNotificationPressed = () => {
    navigation.navigate('Notification');
  };

  const onEditBinPressed = () => {
    navigation.navigate('BinSize');
  };

  const onConfirmSchedulePressed = () => {
    navigation.navigate('ScheduleConfirmation');
  };

  const onRepeatOptionPressed = (option) => {
    setRepeatOption(option);
    setIsModalVisible(true);
  };

  const onSelectDay = (day) => {
    setSelectedDays((prevDays) => 
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const confirmDaysSelection = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule a Pick Up</Text>
        <Text style={styles.subtitle}>schedule a pick up at a selected time!</Text>
        <TouchableOpacity onPress={onNotificationPressed} style={styles.notificationIconWrapper}>
          <Icon name="notifications-outline" size={24} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.dateContainer}>
        {['17 TUE', '18 FRI', '19 SUR', '20 SUN', '21 MON'].map((day, index) => (
          <View
            key={index}
            style={[
              styles.dateBox,
              selectedDay === day.split(' ')[0] ? styles.selectedDate : null,
            ]}
            onPress={() => setSelectedDay(day.split(' ')[0])}
          >
            <Text style={[
              styles.dateText, 
              selectedDay === day.split(' ')[0] ? { color: 'white' } : null
            ]}>
              {day.split(' ')[0]}
            </Text>
            <Text style={[
              styles.dayText, 
              selectedDay === day.split(' ')[0] ? { color: 'white' } : null
            ]}>
              {day.split(' ')[1]}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.checkboxContainer}>
        {['Repeat Daily', 'Repeat Weekly', 'Twice Weekly', 'Monthly           '].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.checkboxRow}
            onPress={() => onRepeatOptionPressed(option)}
          >
            <Icon name={repeatOption === option ? "checkmark-circle" : "square-outline"} size={20} color="#7C6DDD" />
            <Text style={styles.checkboxText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Select Days for Pickup</Text>

                {repeatOption === 'Monthly' ? (
                  <Text style={styles.repeatInfo}>Select days for your monthly pickup:</Text>
                ) : (
                  <Text style={styles.repeatInfo}>Select days for your {repeatOption} pickup:</Text>
                )}

                <View style={styles.daySelection}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dayButton,
                        selectedDays.includes(day) ? styles.dayButtonSelected : null,
                      ]}
                      onPress={() => onSelectDay(day)}
                    >
                      <Text style={[
                        styles.dayButtonText,
                        selectedDays.includes(day) ? { color: 'white' } : null,
                      ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity style={styles.confirmButton} onPress={confirmDaysSelection}>
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>

      <View style={styles.binContainer}>
            <Text style={styles.sectionTitle}>Size of bin</Text>
            <TouchableOpacity style={styles.editButton} onPress={onEditBinPressed}>
              <Text style={styles.editText}>Edit</Text>
              <Icon name="pencil-outline" size={14} color="#7C6DDD" />
            </TouchableOpacity>
            <View style={styles.binCard}>
              <Image source={require('../assets/Bin2.jpeg')} style={styles.binImage} />
              <View style={styles.binDetails}>
                <Text style={styles.binTitle}>Large</Text>
                <Text style={styles.binInfo}>140 litre bin{'\n'}4-5 full black bags</Text>
                <Text style={styles.binPrice}>$70.00</Text>
              </View>
              <View style={styles.binQuantity}>
                <TouchableOpacity onPress={() => setBinCount(binCount - 1)} disabled={binCount === 1}>
                  <Text style={styles.quantityControl}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{binCount}</Text>
                <TouchableOpacity onPress={() => setBinCount(binCount + 1)}>
                  <Text style={styles.quantityControl}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
       </View>

      <View style={styles.addressContainer}>
        <Text style={styles.sectionTitle}>Pick Up Address</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
          <Icon name="pencil-outline" size={14} color="#7C6DDD" />
        </TouchableOpacity>
        <View style={styles.addressCard}>
          <View style={styles.addressRow}>
            <Icon name="location-outline" size={22} color="#7C6DDD" />
            <Text style={styles.addressText}>Home</Text>
          </View>
          <Text style={styles.fullAddress}>45 Kofi Annan St, Accra, Ghana</Text>
          <Text style={styles.addressCode}>GA1184349</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.scheduleButton} onPress={onConfirmSchedulePressed}>
        <Icon name="time-outline" size={20} color="white" />
        <Text style={styles.scheduleButtonText}>Confirm new pickup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 80,
  },
  header: {
    backgroundColor: '#55A57F',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    height: 210,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 0,
  },
  notificationIconWrapper: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  notificationIcon: {
    color: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -60,
  },
  dateBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 60,
    height: 100,
    justifyContent: 'center',
  },
  selectedDate: {
    backgroundColor: '#7C6DDD',
  },
  dateText: {
    fontSize: 28,
    color: '#7C6DDD',
  },
  dayText: {
    fontSize: 12,
    color: '#7C6DDD',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#7C6DDD',
  },
  binContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color:'#979797'
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  editText: {
    color: '#7C6DDD',
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  binCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  binImage: {
    width: 60,
    height: 80,
    marginRight: 15,
  },
  binDetails: {
    flex: 1,
  },
  binTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  binInfo: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  binPrice: {
    fontSize: 18,
    color: '#34D186',
    fontWeight: 'bold',
    marginTop: 10,
  },
  binQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityControl: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#000',
    backgroundColor:'#5555',
    width: 30,
    height: 30,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  addressContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  addressCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullAddress: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    paddingHorizontal: 25,
  },
  addressCode: {
    fontSize: 14,
    color: '#A11843',
    marginTop: 5,
    fontWeight: 'bold',
    paddingHorizontal: 25
  },
  scheduleButton: {
    backgroundColor: '#7C6DDD',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  scheduleButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  daySelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dayButton: {
    backgroundColor: 'white',
    borderColor: '#7C6DDD',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  dayButtonSelected: {
    backgroundColor: '#7C6DDD',
  },
  dayButtonText: {
    fontSize: 14,
    color: '#7C6DDD',
  },
  confirmButton: {
    backgroundColor: '#7C6DDD',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  repeatInfo:{
    marginBottom: 20,
    marginTop: -10,
    fontSize: 14,
    color: '#888',
  }
});
