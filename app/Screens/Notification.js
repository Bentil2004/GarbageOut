import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notification = () => {
    return (
        <View style={styles.container}>
          <Text>Notifications</Text>
        </View>
      )
    }

export default Notification

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#55A57F'
    }
  })










// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Button, Platform, Alert } from 'react-native';
// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// const Notification = () => {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);

//   useEffect(() => {
//     // Request permissions for notifications
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     // Listen for incoming notifications
//     const notificationListener = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener);
//       Notifications.removeNotificationSubscription(responseListener);
//     };
//   }, []);

//   const handleSendNotification = async () => {
//     await schedulePushNotification();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Notifications</Text>
//       <Button title="Send Test Notification" onPress={handleSendNotification} />
//       {notification && (
//         <View style={styles.notificationContainer}>
//           <Text style={styles.notificationText}>New Notification:</Text>
//           <Text>{notification.request.content.body}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default Notification;

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Welcome to GarbageOut quality and reliable service.',
//     },
//     trigger: { seconds: 1 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   const { status } = await Notifications.requestPermissionsAsync();
//   if (status !== 'granted') {
//     Alert.alert('Failed to get push token for push notification!');
//     return;
//   }
//   token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log(token);
//   return token;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   notificationContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 10,
//   },
//   notificationText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
