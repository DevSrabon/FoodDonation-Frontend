import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import SecuredChat from './SecuredChat';
import { useRoute } from "@react-navigation/core";

import { auth } from "../context/Provider";
import { getDatabase, ref, onValue, off } from 'firebase/database';
import RoutesMap from './RoutesMap';

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
  //scedulepushnotification("title", "body", "data ");
  useEffect(() => {

    onValue(ref(getDatabase(), auth.currentUser?.email.replace(/[@.]/g, "")), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.values(data));
      }
    });
  }, []);

  const navigation = useNavigation();

  const handleUserPress = (userchatId,user,emaill) => {
    navigation.navigate('SecuredChat', { userchatId ,user,emaill});
 
  };

  return (
    <View style={{ marginTop: 30, marginBottom: 50 }}>
      <ScrollView>
        {users.reverse().map((user) => (
          <TouchableOpacity key={user.chatid} onPress={() => handleUserPress(user.chatid.replace(/[@.]/g, ""),user.name,user.mail)}>
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

export const exportUserChatId = (props) => {
  const route = useRoute();
  return route.params?.userchatId ;
};


const Stack = createNativeStackNavigator();

const Chat = () => {
  const userchatId = exportUserChatId();
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen
        name="SecuredChat"
        component={SecuredChat}
        initialParams={{ userchatId }}
        options={{headerShown:false}}
        
      
      />
      <Stack.Screen name="Routes" component={RoutesMap} initialParams={{userchatId}} />
    </Stack.Navigator>
  );
};

export default Chat;

const styles = StyleSheet.create({
  // Your styles here
});
