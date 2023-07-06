import React, { useEffect, useState } from 'react';
import { RandomNumber, handleCreateUser } from '../screens/Chat';

import { getDatabase, ref, onValue, push } from 'firebase/database';
const db = getDatabase();

const ListenForChatAdd = () => {
  console.log("ListenForChatAdd");  
  const a = RandomNumber();
  const [message, setMessage] = useState('');
    //if user.role is donor then listen for (connect)accept from needy
    //if user.role is needy then listen for help accept from donor
    //if user.role is transporter then listen for help accept from needy
    //if user.role is needy then listen for help accept from transporter
    //if user.role is donor then listen for help accept from transporter
    //if user.role is transporter then listen for help accept from donor

    if(user.role==="doner"){
        //listen for accept from needy
        
        
          //call create chat for donor
          handleCreateUser(user,setUser,"Donor","donor",a);
          //send message Donor has been added
          
          function sendMessage1() {
            if (message.trim()) {
              const newMessage = {
                text: "Donor has been added",
              };
              
              push(ref(db, `rooms/${userchatId}/messages`), newMessage);
              setMessage('');

        
            }
            
          }
          
          sendMessage1();
     
    }
    if(user.role ==="needy"){
        //listen for accept from donor
        //call create chat function for needy
        
          //send message Needy has been added
          
          handleCreateUser(user,setUser,"Needy","needy",a);
          
          function sendMessage2() {
            if (message.trim()) {
              const newMessage = {
                text: "Needy has been added",
              };
              
              push(ref(db, `rooms/${userchatId}/messages`), newMessage);
              setMessage('');
        
            }
          }
          
          sendMessage2();
    }
    if(user.role ==="transporter") {
      //open a chat for transporter using room id
      //call create chat function for transporter
    
          //send message Transporter has been added
          
          handleCreateUser(user,setUser,"Transporter","transporter",a);
          
          function sendMessage3() {
            if (message.trim()) {
              const newMessage = {
                text: "Transporter has been added",
              };
              
              push(ref(db, `rooms/${userchatId}/messages`), newMessage);
              setMessage('');
        
            }
          }
    
          sendMessage3();
    }

    
  useEffect(() => {
    //when donor create post after that this will continue to listen
    //until someone accept


    
    function sendMessage1() {
      if (message.trim()) {
        const newMessage = {
          text: "Donor has been added",
        };
        
        push(ref(db, `rooms/${userchatId}/messages`), newMessage);
        setMessage('');
      }
      
    }
    sendMessage1();
  }, [accept]);
     
  useEffect(() => {
   //when needy create help needy create post after that this will continue to listen
  //until someone donate
     function sendMessage2() {
      if (message.trim()) {
        const newMessage = {
          text: "Needy has been added",
        };
        
        push(ref(db, `rooms/${userchatId}/messages`), newMessage);
        setMessage('');
      }
      
    }
    
    sendMessage2();
  

  }, [ donate]);
  

  return null;
};

export default ListenForChatAdd;
