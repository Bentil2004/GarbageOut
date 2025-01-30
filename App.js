import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./Navigation";
import "./global.css";
import { UserProvider } from "./app/context/UserContext";


const App = () => {
  return (
    <UserProvider>
    <SafeAreaProvider style={styles.root}>
    <Navigation/>
    </SafeAreaProvider>
    </UserProvider>
  );
};
const styles = StyleSheet.create({
  // root: {
  //   flex: 1,
  //   backgroundColor: "#ffff",
  // },
});

export default App;
