/*import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { auth } from "../context/Provider";
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import useFetchData from "../hook/useFetchData";
import {auth} from '../context/Provider';
//const GOOGLE_MAPS_APIKEY =  "AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ";  Replace with your Google Maps API key


const RoutesMap = () => {
  const route = useRoute();
  const { userchatId } = route.params;
const currentUser =useFetchData(`users?email=${user?.auth.currentUser.email}`)
  const opponentUser = useFetchData(`users?email=${user?.auth.currentUser.email}`);
  const transporter = useFetchData(`users?email=${user?.auth.currentUser.email}`);
  /*useEffect(() => {
   
        set(
          ref(
            getDatabase(),
            `location/${userchatId}/` + auth.currentUser.email.replace(/[@.]/g, "")
          ),
        )

     
      },[]);
 

    const fetchOtherUsers = () => {
      const dbRef = ref(getDatabase(), `location/${userchatId}`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setOtherUsers(data);
        }
      });
    };

    const intervalId = setInterval(fetchOtherUsers, 5000); // Fetch opponent user's location every 5 seconds

    fetchData();
    fetchOtherUsers();
    return () => {
      clearInterval(intervalId);
      off(ref(getDatabase(), `location/${userchatId}`));
    };
  }, [userchatId]);

  const renderMarkers = () => {
    const markers = Object.entries(otherUsers).map(([userEmail, userLocation]) => (
      <Marker
        key={userEmail}
        pinColor="yellow"
        coordinate={{
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        }}
        title={userEmail}
      />
    ));

    if (status && status.coords) {
      markers.push(
        <Marker
          key={"userLocation"}
          
          coordinate={{
            latitude: status.coords.latitude,
            longitude: status.coords.longitude,
          }}
          title={auth.currentUser.email.replace(/[@.]/g, "")}
        />
      );
    }

    return markers;
    
  };

  const renderDirections = () => {
    if (status && status.coords && Object.keys(otherUsers).length > 0) {
      const origin = {
        latitude: status.coords.latitude,
        longitude: status.coords.longitude,
      };

      const destinations = Object.values(otherUsers).map((userLocation) => ({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      }));

      return destinations.map((destination, index) => (
        <MapViewDirections
          key={index}
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#4287f5"
        />
      ));
    }

    return null;
  };

  return (
    <View style={styles.container}>
      
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={initialRegion}>
          <Marker
            coordinate={{
              latitude: currentUser?.lat,
              longitude: currentUser?.lng,
            }}
            title={currentUser?.email}
          />
          <Marker
            coordinate={{
              latitude: opponentUser?.lat,
              longitude: opponentUser?.lng,
            }}
            title={opponentUser?.email}
          />
          <MapViewDirections
            origin={{
              latitude: currentUser?.lat,
              longitude: currentUser?.lng,
            }}
            destination={{
              latitude: opponentUser?.lat,
              longitude: opponentUser?.lng,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="#4287f5"
          />
        </MapView>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default RoutesMap;
*/
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RoutesMap = () => {
  return (
    <View>
      <Text>RoutesMap</Text>
    </View>
  )
}

export default RoutesMap

const styles = StyleSheet.create({})