import React, { useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');

        setTimeout(() => {
          if (token) {
            navigation.replace("BottomTabNavigator");
          } else {
            navigation.replace('Onboarding');
          }
        }, 2000);
      } catch (error) {
        console.error('Error checking token:', error);
        navigation.replace('Onboarding');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Splash.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: '80%',
    height: '30%',
  },
});

export default SplashScreen;

