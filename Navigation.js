import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Splash from "./app/Screens/SplashScreen";
import Onbording from "./app/Screens/OnbordingScreen";
import SignUp from "./app/Screens/SignUp";
import PhoneVerification from "./app/Screens/PhoneVerification";
import Verification from "./app/Screens/Verification";
import BottomTabNavigator from "./BottomTabNavigator";
import ScheduleConfirmation from "./app/Screens/ScheduleConfirmation";
import BinSize from "./app/Screens/BinSize";
import Home from "./app/Screens/Home";
import Notification from "./app/Screens/Notification";


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="BinSize" component={BinSize} />
            <Stack.Screen name="Onbording" component={Onbording} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name="ScheduleConfirmation" component={ScheduleConfirmation} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Notification" component={Notification} />
          </Stack.Navigator>
        </NavigationContainer>
  );
};

export default Navigation;
