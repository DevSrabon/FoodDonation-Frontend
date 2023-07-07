import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import Chat1 from './Chat1';
import { useRoute } from "@react-navigation/core";

import { auth } from "../context/Provider";
import { getDatabase, ref, onValue, off } from 'firebase/database';

export function RandomNumber() {
  const randomNumber = Math.floor(Math.random() * 1000);
  return randomNumber;
}

const Users = () => {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([
    {
      chatid: 1,
      name: 'Global',
      message: 'Welcome to global Chat',
      profileImage: require('../../assets/icons/profile.png'),
      },
    // Add more user objects here
  ]);
 /*
  useEffect(() => {
    const database = getDatabase();
    const userRef = ref(database, auth.currentUser.uid);
    const onValueChange = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setData(userData);
    });

    return () => {
      off(userRef, "value", onValueChange);
    };
  }, []);

  useEffect(() => {
    let i=4;
    if (data) {
      setUsers(prevUsers => [
       
        {
          chatid: [i],
          name: data.name2,

          message: 'Hey! I have some food for you',
          profileImage: require('../../assets/icons/profile.png'),
        }, ...prevUsers
      ]);
    }
  }, [data]);*/
  useEffect(() => {
    onValue(ref(getDatabase(), auth.currentUser.email.replace(/[@.]/g, "")), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.values(data));
      }
    });
  }, []);

  const navigation = useNavigation();

  const handleUserPress = (userchatId) => {
    navigation.navigate('Chat1', { userchatId });
  };

  return (
    <View style={{ marginTop: 50 }}>
      <ScrollView>
        {users.map((user) => (
          <TouchableOpacity key={user.chatid} onPress={() => handleUserPress(user.chatid.replace(/[@.]/g, ""))}>
            <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
              <Image source={require('../../assets/icons/profile.png')} style={{ width: 60, height: 60, borderRadius: 30 }} />
              <View>
                <Text style={{ fontSize: 17, fontWeight: 'bold', paddingLeft: 20 }}>{user.name}</Text>
                <Text style={{ fontSize: 15, paddingLeft: 20 }}>{user.message}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const Chat = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />
      <Stack.Screen
        name="Chat1"
        component={Chat1}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("map");
              }}
              title="Map"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default Chat;

const styles = StyleSheet.create({
  // Your styles here
});
