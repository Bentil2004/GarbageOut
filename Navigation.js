import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./app/Screens/SplashScreen";
import Onbording from "./app/Screens/OnbordingScreen";
// import OnbordSignUp from "./app/Screens/Authentication/OnbordSignUp";
import PhoneVerification from "./app/Screens/PhoneVerification";
import Verification from "./app/Screens/Verification";
import BottomTabNavigator from "./BottomTabNavigator";
import ScheduleConfirmation from "./app/Screens/ScheduleConfirmation";
// import BinSize from "./app/Screens/BinSize";
import Home from "./app/Screens/Home";
import Notification from "./app/Screens/Notification";
import Terms from "./app/Screens/Terms";      
import PrivacyPolicy from "./app/Screens/PrivacyPolicy";
import Delete from "./app/Screens/Delete";
import About from "./app/Screens/About";
import AddScheduleScreen from "./app/Screens/AddScheduleScreen";
// import Address from "./app/Screens/Address";
import LanguageChange from "./app/Screens/LanguageChange";
import Support from "./app/Screens/Support";
import PaidSubs from "./app/Screens/PaidSubs";
import LogIn from "./app/Screens/Authentication/LogIn";
import SignUp from "./app/Screens/Authentication/SignUp";
import ForgotPassword from "./app/Screens/Authentication/ForgotPassword";
import Payment from "./app/Screens/Payment";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AddScheduleScreen" component={AddScheduleScreen} /> 
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="LogIn" component={LogIn} />  
            <Stack.Screen name="Verification" component={Verification} />
            {/* <Stack.Screen name="OnbordSignUp" component={OnbordSignUp} /> */}
            {/* <Stack.Screen name="BinSize" component={BinSize} /> */}
            <Stack.Screen name="Onbording" component={Onbording} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name="ScheduleConfirmation" component={ScheduleConfirmation} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Delete" component={Delete} />
            <Stack.Screen name="About" component={About} />   
            {/* <Stack.Screen name="Address" component={Address} /> */}
            <Stack.Screen name="LanguageChange" component={LanguageChange} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="PaidSubs" component={PaidSubs} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Payment" component={Payment} />
          </Stack.Navigator>
        </NavigationContainer>
  );
};

export default Navigation;
