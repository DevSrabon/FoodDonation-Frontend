import React, { useState } from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { StyleSheet, View, Button, Platform, Text } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { userContext } from '../context/Provider';
import axios from 'axios';
const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

    const now = Date.now();
    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
   
    await schedulePushNotification('Notification Title', 'Notification Body', { data: 'The data we want' });

    return BackgroundFetch.BackgroundFetchResult.NewData;
});


async function schedulePushNotification(title, body, data) {
  
        const isNotificationScheduled = await Notifications.getAllScheduledNotificationsAsync();

        if (isNotificationScheduled.length === 0) {
        
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: title,
                    body: body,
                    data: data,
                    // title: "You've got notification! 📬",
                    // body: 'Here is the notification body',
                    // data: { data: 'goes here' },
                },
                trigger: null, // Remove the trigger to schedule the notification immediately
            });
        }
        console.log('Notification scheduled successfully!');
    }

async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 24, // 15 second
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
    });
}


(async () => {
    try {
        await schedulePushNotification();
    } catch (error) {
        console.error('Error ====', error);
    }
})();



async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}






 const BackgroundFetchScreen=()=> {
    
    const { user, setAllData } = userContext();
    const [expoPushToken, setExpoPushToken] = React.useState('');
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    const [notification, setNotification] = React.useState(false);
    const [state,setState] = useState(false);
    React.useEffect(() => {
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
            setState(true);
        };
    }, []);
    const checkForOrderStatus= async()=>{ try {
        const response = await axios.get(
          `https://food-donation-backend.vercel.app/api/v1/users?email=${user?.email}`
        );
       if(response.data.data.role == 'donor'&& response.data.data.donorNotification==true){

        await schedulePushNotification(
            'Order Accepted',
            'Your order has been accepted by a volunteer',
            { data: 'goes here' },
        );
       }
       if(response.data.data.role == 'needy'&&response.data.data.needyNotification==true){
        await schedulePushNotification(
            'Order Accepted',
            'Your order has been accepted by a volunteer',
            { data: 'goes here' },
        );
       }
       if(response.data.data.role == 'transporter'&&response.data.data.transporterNotification==true){
        await schedulePushNotification(
            'Order Accepted',
            'Your order has been accepted by a volunteer',
            { data: 'goes here' },
        );
       }
      } catch (error) {
        console.log("notification not triggred",error);
      }
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            
                checkForOrderStatus();
            
            console.log('Logs every minute');
          }, 10000);
       
          return () => clearInterval(interval);
    }, [state]);

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
            console.log("push token =====", token);
        } else {
            alert('Must use physical device for Push Notifications');
        }
        return token;
    }



    const [isRegistered, setIsRegistered] = React.useState(false);
    const [status, setStatus] = React.useState(null);

    React.useEffect(() => {
        checkStatusAsync();
    }, []);

    const checkStatusAsync = async () => {
        const status = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        setStatus(status);
        setIsRegistered(isRegistered);
    };

    const toggleFetchTask = async () => {
        if (isRegistered) {
            await unregisterBackgroundFetchAsync();
        } else {
            await registerBackgroundFetchAsync();
        }
        checkStatusAsync();
    };

    return (
        <View style={styles.screen}>
            <View style={styles.textContainer}>
                <Text>
                    Background fetch status:{' '}
                    <Text style={styles.boldText}>
                        {status && BackgroundFetch.BackgroundFetchStatus[status]}
                    </Text>
                </Text>
                <Text>
                    Background fetch task name:{' '}
                    <Text style={styles.boldText}>
                        {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
                    </Text>
                </Text>
            </View>
            <View style={styles.textContainer}></View>
            <Button
                title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
                onPress={toggleFetchTask}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        margin: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
});
export default BackgroundFetchScreen;