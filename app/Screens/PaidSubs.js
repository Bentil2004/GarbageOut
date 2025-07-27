import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useBins } from '../context/BinsContext';

const ScheduleConfirmation = ({ route }) => {


  const navigation = useNavigation();
  const { bins } = useBins()

  const { data } = route.params || {};
  console.log(data)

  const getBinSize = (id) =>{
    const found = bins.find(item => item?.id == id)
    console.log("getsize", id, bins)
    return found?.size
  }

  const getBinPrice = (id) =>{
    const found = bins.find(item => item?.id == id)
    return found?.price
  }

  const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour:"2-digit",
    minute:"2-digit"
  });
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Schedule Payment Details</Text>

      <View style={styles.detailsCard}>
        <Image source={require('../assets/schedule.png')} style={styles.binImage} />
        
        <ScrollView style={styles.detailsText} showsVerticalScrollIndicator={false}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Location name:</Text>
            <Text style={styles.value}>{data?.location?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Subscription:</Text>
            <Text style={styles.value}>{data?.subscription?.subscription_name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Payment Time:</Text>
            <Text style={styles.value}>{formatDate(data?.last_updated)}</Text>
          </View>
          {data?.trash_bins?.map((bin, index) => (
            <View key={index} style={styles.binDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Bin size:</Text>
                <Text style={styles.value}>{getBinSize(bin?.trash_bin)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.value}>{bin?.number_of_trash_bins}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.valueprice}>{`GHC ${Number(getBinPrice(bin?.trash_bin) * bin?.number_of_trash_bins).toFixed(2)}`}</Text>
              </View>
            </View>
          ))}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Total amount:</Text>
            <Text style={styles.value}>{`GHC ${data?.price}`}</Text>
          </View>
        </ScrollView>
        
      </View>

      <View style={styles.scheduleButtonContainer} >
        <TouchableOpacity style={styles.scheduleButton} onPress={()=> navigation.goBack()}>
        <Text style={styles.scheduleButtonText}>Go Back</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 70,
  },
  detailsCard: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  binImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsText: {
    width: '100%',
    marginBottom: 0,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    color: 'gray',
    fontSize: 16,
    marginRight: 10,
  },
  value: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  binDetails: {
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  scheduleButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    //backgroundColor: '#7C6DDD',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    display:"flex",
    flexDirection:"row",
    gap:15
  },
  scheduleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C6DDD',
    paddingVertical: 15,
    borderRadius: 10,
    // marginTop: 15,
    marginBottom: 20,
  },
  scheduleButtonL: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa',
    paddingVertical: 15,
    borderRadius: 10,
    // marginTop: 15,
    marginBottom: 20,
  },
  scheduleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

    valueprice: {
    color: '#55A57F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonConfirm: {
    backgroundColor: '#7C6DDD',
  },
  buttonCancel: {
    backgroundColor: '#DD4B39',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
