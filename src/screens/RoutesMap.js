import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect ,useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import {auth} from "../context/Provider";
import { get, getDatabase, ref, set } from "firebase/database";
const RoutesMap = () => {
  //current user mail er modhye onno user er mail
  const [status,setStatus] = useState(null);
  const [status1,setStatus1] = useState(null);

  const requestLocationPermission = async () => {
    const {foregroundStatus} = await Location.requestForegroundPermissionsAsync();
   
    if (foregroundStatus != 'granted') {
      console.log('Location permission denied');
      return false;
    }
    const { backgroundStatus} = await Location.requestBackgroundPermissionsAsync();
  
    if (backgroundStatus != 'granted') {
      console.log('Location permission denied');
      return false;
    }
    return true;
  };
  
  console.log(status1)
  console.log(status)
  
  useEffect(() => {
    const result=  requestLocationPermission();
    setStatus(result);
    setTimeout(() => {
      if(result)
      {
        getAndUpdateLocation();
      }
    }, 3000);
  }, [])
  const getAndUpdateLocation = async () =>{
    if (status === true) {
     
      let location = await Location.getCurrentPositionAsync({});
     console.log(location);
     set(ref,getDatabase(),"location/" + auth.currentUser.email.replace(/[@.]/g, ""),{
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }
}
  return (
    <View>
      <Text>RoutesMap</Text>
      
    </View>
  );
};
export default RoutesMap;
