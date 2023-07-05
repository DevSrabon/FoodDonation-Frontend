import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import Chat1 from './Chat1';

const Users = () => {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 50 }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('Chat1')}>
          <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
            <Image source={require('../../assets/icons/profile.png')} style={{ width: 60, height: 60, borderRadius: 30 }} />
            <View>
              <Text style={{ fontSize: 17, fontWeight: 'bold', paddingLeft: 20 }}>Dinesh Lal</Text>
              <Text style={{ fontSize: 15, paddingLeft: 20 }}>Hey! I have some food for you</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const Chat = () => {
  return (
    <Stack.Navigator  >
      <Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />
      <Stack.Screen name="Chat1" component={Chat1} />
    </Stack.Navigator>
  );
};

export default Chat;

const styles = StyleSheet.create({
  // Your styles here
});
