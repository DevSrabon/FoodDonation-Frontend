import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { Marker, MapView } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { encryptMessage, decryptMessage } from './Encrypt';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import {auth} from '../context/Provider';
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
      <TouchableOpacity onPress={() => navigation.navigate('Routes', { userchatId })}>
        <Text style={{ position: 'absolute',padding:10,borderWidth:1, top: 10, right: 10, zIndex: 1, borderRadius: 100, backgroundColor: "lightblue" }}>Map</Text>
      </TouchableOpacity>
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