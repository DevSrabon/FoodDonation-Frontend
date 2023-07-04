import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
// import firestore from '@react-native-firebase/firestore';

import { getDatabase, ref, onValue, push } from 'firebase/database';
import { userContext } from "../context/Provider";
const Ww = Dimensions.get("screen").width;
import Container from "../components/container";

const Chat = () => {
  const [messages, setMessage] = useState([]);
  const { allData } = userContext();
  const db = getDatabase();
  function Message({ item }) {

    const isCurrentUser = item.user === auth.currentUser.email;
    return (
      <View style={[styles.message, isCurrentUser ? styles.currentUserMessage : null]}>
        <Text style={[styles.user]}>
          {item.user2}
        </Text>
        <Text style={[styles.text, isCurrentUser ? styles.currentUserText : null]}>
          {item.text}
          </Text>
        <Text style={[styles.date, isCurrentUser ? styles.currentUserDate : null]}>
          {new Date(item.createdAt).toLocaleTimeString()}
         
        
        </Text>
        
      </View>
    );
  }
  
   
    useEffect(() => {
      onValue(ref(db, `messages`), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(Object.values(data));
        }
      });
    }, []);
  
    function sendMessage() {
     /* onValue(ref(db, `rooms/${dd}/${uid}`), (snapshot) => {
        const namee = snapshot.val();})*/
      if (message.trim()) {
        const newMessage = {
          id: Date.now().toString(),
          text: message.trim(),
          user2: nme2,
          user:auth.currentUser.email,
          createdAt: new Date().toISOString(),
        };
        push(ref(db, `messages`), newMessage);
        setMessage('');
      }
    }
  
  
   
    function renderItem({ item }) {
      return <Message item={item} />;
    }
  const route = useRoute();

  // useEffect(() => {

  //   const subscriber = firestore()
  //     .collection('chats')
  //     .doc(route.params.email + route.params.data.email)
  //     .collection('messages')
  //     .orderBy('createdAt', 'desc');
  //   subscriber.onSnapshot(querysnapshot => {
  //     const allmessages = querysnapshot.docs.map(item => {
  //       return { ...item._data, createdAt: item._data.createdAt };
  //     });
  //     setMessage(allmessages);
  //   });
  //   return () => subscriber();
  // }, []);

  // const checkCollectionExists = async () => {

  //   try {
  //     const collectionRef = firestore().collection(route.params.email);
  //     const querySnapshot = await collectionRef.where('email', '==', route.params.data.email).limit(1).get();
  //     return querySnapshot.size > 0;
  //   } catch (error) {
  //     console.error('Error checking email:', error);
  //     return false;
  //   }
  // };

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    console.log(allData);
    const myMsg = {
      ...msg,

      createdAt: Date.parse(msg.createdAt),
    };
    setMessage((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );

    // firestore()
    //   .collection('chats')
    //   .doc(route.params.email + route.params.data.email)
    //   .collection('messages')
    //   .add(myMsg);
    // firestore()
    //   .collection('chats')
    //   .doc(route.params.data.email + route.params.email)
    //   .collection('messages')
    //   .add(myMsg);

    // const Name = await AsyncStorage.getItem('NAME');

    // checkCollectionExists()

    //   .then((exists) => {
    //     if (exists) {

    //     } else {
    //       firestore()
    //         .collection(route.params.email)
    //         .add(route.params.data);

    //       firestore()
    //         .collection(route.params.data.email)
    //         .add({
    //           name: Name,
    //           email: route.params.email //users email which is currently login
    //         });
    //     }
    //   })
  }, []);

  //console.log(messages)

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              style={{ width: 30, height: 30, marginLeft: 10 }}
              source={require("../../assets/icons/leftArrow.png")}
            ></Image>
          </TouchableOpacity>
          <Image
            style={{ width: 30, height: 30, marginLeft: 10 }}
            source={require("../../assets/icons/profile.png")}
          ></Image>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "400",
              marginLeft: 10,
              color: "#fff",
            }}
          >
            name
          </Text>
        </View>
        {/* <View style={{ flexDirection: 'row', }}>
          <FontAwesomeIcon icon={faVideo} style={{ color: '#fff' }} size={23}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faPhone} style={{ marginLeft: 20, color: '#fff' }} size={20}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faEllipsisVertical} style={{ marginLeft: 10, color: '#fff' }} size={23}></FontAwesomeIcon>
        </View> */}
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: "1",
        }}
        alwaysShowSend={true}
        renderSend={(props) => {
          return (
            <Send {...props}>
              <View {...props} style={styles.Sendbutton}>
                <Image
                  style={{ width: 30, height: 30, left: 4 }}
                  source={require("../../assets/icons/send.png")}
                ></Image>
              </View>
            </Send>
          );
        }}
        renderInputToolbar={(props) => {
          return (
            <InputToolbar
              {...props}
              containerStyle={styles.InputToolbar}
            ></InputToolbar>
          );
        }}
        textInputProps={{
          style: { color: "#fff", paddingHorizontal: 15, width: Ww - 64 }, // Set the text color here
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: { color: "white" },
                left: { color: "white" },
              }}
              wrapperStyle={{
                right: { backgroundColor: "#007AFF" },
                left: { backgroundColor: "#1f2c34" },
              }}
            />
          );
        }}
        messagesContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#273236",
    paddingHorizontal: 10,
    height: 60,
  },
  InputToolbar: {
    backgroundColor: "#1f2c34",
    borderRadius: 30,
    marginRight: 60,
    marginLeft: 5,
    marginBottom: 5,
  },
  Sendbutton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00a884",
    height: 45,
    width: 45,
    borderRadius: 50,
    // left: 55,
  },
});
