import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const bins = [
  { id: 1, name: 'Small', size: '140 litre bin', bags: '2 full black bags', price: 30 },
  { id: 2, name: 'Standard', size: '140 litre bin', bags: '3 full black bags', price: 60 },
  { id: 3, name: 'Large', size: '140 litre bin', bags: '4-5 full black bags', price: 70 },
  { id: 4, name: 'Extra Large', size: '140 litre bin', bags: '6-8 full black bags', price: 100 },
];

const BinSize = () => {
  const [selectedBins, setSelectedBins] = useState([]);
  
  const [quantities, setQuantities] = useState({});
  const navigation = useNavigation();


  const handleSelectBin = (id) => {
    if (selectedBins.includes(id)) {
      setSelectedBins(selectedBins.filter(binId => binId !== id));
      setQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        delete updatedQuantities[id]; 
        return updatedQuantities;
      });
    } else {
      setSelectedBins([...selectedBins, id]);
      setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: 1 })); 
    }
  };

  const handleQuantityChange = (id, type) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[id] || 1;
      if (type === 'increase') {
        return { ...prevQuantities, [id]: currentQuantity + 1 };
      } else if (type === 'decrease' && currentQuantity > 1) {
        return { ...prevQuantities, [id]: currentQuantity - 1 };
      }
      return prevQuantities;
    });
  };

  const onProceedPressed = () => {
    navigation.navigate('ScheduleConfirmation');
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack('')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>

      <Text style={styles.header}>Select Bin Size</Text>
      {bins.map((bin) => (
        <TouchableOpacity
          key={bin.id}
          style={[
            styles.binContainer,
            selectedBins.includes(bin.id) && styles.selectedBin, 
          ]}
          onPress={() => handleSelectBin(bin.id)}
        >
          <Image
            source={require('../assets/Bin2.jpeg')} 
            style={styles.binImage}
          />
          <View style={styles.binDetails}>
            <Text style={styles.binName}>{bin.name}</Text>
            <Text style={styles.binSize}>{bin.size}</Text>
            <Text style={styles.binBags}>{bin.bags}</Text>
            {selectedBins.includes(bin.id) && (
              <>
                <Text style={styles.price}>${bin.price * quantities[bin.id]}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(bin.id, 'decrease')}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantities[bin.id]}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(bin.id, 'increase')}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </TouchableOpacity>
      ))}
      {selectedBins.length > 0 && (
        <TouchableOpacity style={styles.proceedButton} onPress={onProceedPressed}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BinSize;

const styles = StyleSheet.create({
  backButton: {
        fontSize: 29,
        color: '#000000',
        position: 'absolute',
        top: 20,
        left: 10,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 50,
    paddingHorizontal: 80,
    paddingBottom: 10,
  },
  binContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedBin: {
    borderColor: '#34D186',
    borderWidth: 2,
  },
  binImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  binDetails: {
    flex: 1,
  },
  binName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  binSize: {
    fontSize: 14,
    color: '#555',
  },
  binBags: {
    fontSize: 12,
    color: '#777',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34D186',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 10,
    padding: 10,
    backgroundColor: '#5555',
    textAlign: 'center',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    paddingHorizontal: 15,
  },
  proceedButton: {
    backgroundColor: '#7C6DDD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
