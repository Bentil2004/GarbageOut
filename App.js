import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./Navigation";
import "./global.css";
import { UserProvider } from "./app/context/UserContext";
import { SchedulesProvider } from "./app/context/SchedulesContext";
import { PickupPointsProvider } from "./app/context/PickupPointsContext";
import { SubscriptionsProvider } from "./app/context/SubscriptionsContext";
import { BinsProvider } from "./app/context/BinsContext";
import { NavigationContainer } from "@react-navigation/native";


const App = () => {
  return (
    <NavigationContainer>
    <UserProvider>
      <SchedulesProvider>
        <PickupPointsProvider>
          <SubscriptionsProvider>
            <BinsProvider>
              <SafeAreaProvider style={styles.root}>
                <Navigation/>
              </SafeAreaProvider>
            </BinsProvider>
          </SubscriptionsProvider>
        </PickupPointsProvider>
      </SchedulesProvider>
    </UserProvider>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  // root: {
  //   flex: 1,
  //   backgroundColor: "#ffff",
  // },
});

export default App;
