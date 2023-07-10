import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { Marker, MapView } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { encryptMessage, decryptMessage } from './Encrypt';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import {auth} from '../context/Provider';
import leftArrow from '../../assets/icons/backbutton.png';
const db = getDatabase();


function Message({ item }) {
  const decryptedText = decryptMessage(item.text);
  const isCurrentUser = item.user === auth.currentUser.displayName;

  return (
    <View style={[styles.message, isCurrentUser ? styles.currentUserMessage : null]}>
      <Text style={[styles.user]}>
        {item.user}
      </Text>
      <Text style={[styles.text, isCurrentUser ? styles.currentUserText : null]}>
        {decryptedText}
      </Text>
      <Text style={[styles.date, isCurrentUser ? styles.currentUserDate : null]}>
        {new Date(item.createdAt).toLocaleTimeString()}
      </Text>
    </View>
  );
}

const SecuredChat = () => {
 
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const route = useRoute();
  const { userchatId } = route.params;
  const {user} = route.params;
  const {emaill} = route.params;
console.log(emaill);
  useEffect(() => {
    onValue(ref(db, `rooms/${userchatId}/messages`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, []);
  function sendMessage() {
    if (message.trim()) {
      const encryptedMessage = encryptMessage(message.trim());
      const newMessage = {
        id: Date.now().toString(),
        text: encryptedMessage,
        user: auth.currentUser.displayName,
        createdAt: new Date().toISOString(),
      };

      push(ref(db, `rooms/${userchatId}/messages`), newMessage);
      setMessage('');
    }
  }

  function renderItem({ item }) {
    return <Message item={item} />;
  }

  return (
    <View style={styles.container}>
      <View style={{paddingTop:50, }}>
      <TouchableOpacity onPress={() => navigation.goBack() }>
        <Image 
        style={{position: 'absolute',padding:10,resizeMode:'contain', height:30, width:30,
        borderWidth:1, top: 20, left: 10,borderRadius:100,backgroundColor: "lightblue" }}
          source={leftArrow} ></Image>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={{ position: 'absolute',padding:10, top: 10, left: 100, zIndex: 1,fontSize:25 }}>{user}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Routes', { userchatId,emaill })} >
        <Text style={{ position: 'absolute',padding:10,borderWidth:1, top: 20, right: 10, zIndex: 1, borderRadius: 100, backgroundColor: "lightblue" }}>Map</Text>
      </TouchableOpacity>
      </View>
      <View style={{paddingTop:20,paddingLeft:10}} >
      <TouchableOpacity>
        <Text style={{ position: 'absolute',padding:10, top: 50, left: 10, zIndex: 1,fontSize:18 }}>Is food delivered?</Text>
        <TouchableOpacity >
          <Text style={{color:"green", position: 'absolute',padding:10, top: 50, left: 180, zIndex: 1,fontSize:18 }}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color:"red", position: 'absolute',padding:10, top: 50, left: 220, zIndex: 1,fontSize:18 }}>No</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      </View>
      <FlatList
        style={styles.messagesContainer}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Icon name="camera" size={25} color="#999" style={styles.cameraIcon} />
        </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default  SecuredChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
    marginTop: 90,
    marginHorizontal: 10,
  },
  message: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingRight: 20,
  },
  text: {
    fontSize: 16,
  },
  date: {
    fontSize: 8,
    color: '#666',
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
  currentUserMessage: {
    backgroundColor: '#B4AAF2',
    alignSelf: 'flex-end',
  },
  currentUserText: {
    color: '#000',
  },
  currentUserDate: {
    color: '#444',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 100,
  },
  cameraIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    bottom: 0,
  },
  sendButton: {
    color: 'blue',
  },
  user: {
    fontSize: 12,
    color: 'green'
  }
});