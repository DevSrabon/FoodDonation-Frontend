import React, { useEffect, useState } from 'react';
import { RandomNumber, handleCreateUser } from '../screens/Chat';

import { getDatabase, ref, onValue, push } from 'firebase/database';
import { View } from 'react-native-web';
import { async } from '@firebase/util';

const db = getDatabase();

export const ListenForChatAdd =()=>{
  console.log("dddddddddddddddddddddddddddddddd")
  const user={role:"donor"};
  
  console.log("ListenForChatAdd");  
  const a = RandomNumber();
  const [message, setMessage] = useState('');
    //if user.role is donor then listen for (connect)accept from needy
    //if user.role is needy then listen for help accept from donor
    //if user.role is transporter then listen for help accept from needy
    //if user.role is needy then listen for help accept from transporter
    //if user.role is donor then listen for help accept from transporter
    //if user.role is transporter then listen for help accept from donor


    /*useEffect(() => {
      //when donor create post after that this will continue to listen
      //until someone accept
      if(user.role==="doner"){
        //listen for accept from needy
        
        
          //call create chat for donor
          handleCreateUser(user,setUser,"Donor","donor",a);
          //send message Donor has been added
          
          
          
          sendMessage1();
     
    }
    if(user.role ==="needy"){
        //listen for accept from donor
        //call create chat function for needy
        
          //send message Needy has been added
          
          handleCreateUser(user,setUser,"Needy","needy",a);
          
          
          
          sendMessage2();
    }
    if(user.role ==="transporter") {
      //open a chat for transporter using room id
      //call create chat function for transporter
    
          //send message Transporter has been added
          
          handleCreateUser(user,setUser,"Transporter","transporter",a);
          
          
    
          sendMessage3();
    }

    
      //sendMessage1();
    }, [accept]);
       
    useEffect(() => {
     //when needy create help needy create post after that this will continue to listen
    //until someone donate
      sendMessage2();
    }, [ donate]);
    
    function sendMessage1() {
    
        const message = {
          text: "Donor has been added",
        };
        
        push(ref(db, `rooms/${userchatId}/messages`), message);
        setMessage('');

    }
    function sendMessage2() {
      
        const newMessage = {
          text: "Needy has been added",
        };
        
        push(ref(db, `rooms/${userchatId}/messages`), newMessage);
        setMessage('');
  
    }
    function sendMessage3() {
   
        const newMessage = {
          text: "Transporter has been added",
        };
        
        push(ref(db, `rooms/${userchatId}/messages`), newMessage);
        setMessage('');
  
    }
    
  */

  return (<View></View>);
};

