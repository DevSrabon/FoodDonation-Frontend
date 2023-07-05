import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import Chat1 from './Chat1';

const users = [
  {
    chatid: 1,
    name: 'Dinesh Lal',
    message: 'Hey! I have some food for you',
    profileImage: require('../../assets/icons/profile.png'),
  },
  {
    chatid: 2,
    name: 'M Vinod',
    message: 'Hey! I have some food for you',
    profileImage: require('../../assets/icons/profile.png'),
  },
  {
    chatid: 3,
    name: 'Ananth Raj',
    message: 'Hey! I have some food for you',
    profileImage: require('../../assets/icons/profile.png'),
  },
  // Add more user objects here
];

const Users = () => {
  const navigation = useNavigation();

  const handleUserPress = (userchatId) => {
    navigation.navigate('Chat1', { userchatId });
  };

  return (
    <View style={{ marginTop: 50 }}>
      <ScrollView>
        {users.map(user => (
          <TouchableOpacity key={user.chatid} onPress={() => handleUserPress(user.chatid)}>
            <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
              <Image source={user.profileImage} style={{ width: 60, height: 60, borderRadius: 30 }} />
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
      <Stack.Screen name="Chat1" component={Chat1} />
    </Stack.Navigator>
  );
};

export default Chat;

const styles = StyleSheet.create({
  // Your styles here
});
