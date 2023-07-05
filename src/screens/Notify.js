import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';

const Notify = () => {
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    useEffect(() => {
        if (requestUserPermission()) {
            messaging().getToken().then((token) => {
                console.log(token);
            })
        }
        else {
            console.log("Failed token status", authStatus);
        }
        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(async (remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                }
            });

        // Assume a message-notification contains a "type" property in the data payload of the screen to open
        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
        });

        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Notify</Text>
            </View>
        </ScrollView>
    )
}

export default Notify;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        width: "100%",
        // height: "100%",
        // justifyContent: "center",
        // alignItems: 'center',
        backgroundColor: "white",
        // paddingBottom: 200
    },

    inputText: {
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        borderRadius: 5,
        height: 40,

    },
});