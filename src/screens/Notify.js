import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Notify() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      {/* <Text>Your expo push token: {expoPushToken}</Text> */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        {/* <Text>Body: {notification && notification.request.content.body}</Text> */}
        {/* <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text> */}
      </View>
      <Button
        title="Press for notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}




// import React, { useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import messaging from '@react-native-firebase/messaging';

// const Notify = () => {
//   useEffect(() => {
//     const requestUserPermission = async () => {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//       if (enabled) {
//         console.log('Authorization status:', authStatus);
//       }
//     };

//     const getToken = async () => {
//       try {
//         const fcmToken = await messaging().getToken();
//         if (fcmToken) {
//           console.log('FCM Token:', fcmToken);
//           // Save the token to your server or use it to send notifications via Firebase
//         } else {
//           console.log('Failed to get FCM token.');
//         }
//       } catch (error) {
//         console.log('Error retrieving FCM token:', error);
//       }
//     };

//     const initializeMessaging = async () => {
//       if (await requestUserPermission()) {
//         await getToken();
//       } else {
//         console.log('Failed to get user permission for messaging.');
//       }
//     };

//     initializeMessaging();

//     messaging().onMessage(async remoteMessage => {
//       console.log('Received a new FCM message:', remoteMessage);
//     });

//     messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log(
//         'Notification caused app to open from background state:',
//         remoteMessage.notification,
//       );
//     });

//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage.notification,
//           );
//         }
//       });

//     // Clean up listeners when component unmounts
//     return () => {
//       messaging().onMessage();
//       messaging().onNotificationOpenedApp();
//     };

//   }, []);

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <Text>Notify</Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default Notify;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 40,
//     width: '100%',
//     backgroundColor: 'white',
//   },
// });