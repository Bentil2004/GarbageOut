import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';

import Home from './app/Screens/Home';
import Schedule from './app/Screens/Schedule';
import Payment from './app/Screens/Payment';
import Settings from './app/Screens/Settings';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const scrollY = new Animated.Value(0);

  const tabBarOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.2],
    extrapolate: 'clamp',
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline'; 
          } else if (route.name === 'Schedule') {
            iconName = 'calendar-outline'; 
          } else if (route.name === 'Payment') {
            iconName = 'wallet-outline'; 
          } else if (route.name === 'Settings') {
            iconName = 'cog-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#34D186',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarLabel: ({ focused, color }) => {
          let label;
          if (route.name === 'Home') {
            label = 'Home';
          } else if (route.name === 'Schedule') {
            label = 'Schedule';
          } else if (route.name === 'Payment') {
            label = 'Payment';
          } else if (route.name === 'Settings') {
            label = 'Settings';
          }
          return (
            <Text style={{ color, fontSize: 12 }}>
              {label}
            </Text>
          );
        }
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
