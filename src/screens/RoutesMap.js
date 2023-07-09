import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { auth } from "../context/Provider";
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = "YOUR_API_KEY"; // Replace with your Google Maps API key

async function askLocationPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }
  
  let { status: status2 } = await Location.requestBackgroundPermissionsAsync();

  let location = await Location.getCurrentPositionAsync({});
  return location;
}

const RoutesMap = () => {
  const route = useRoute();
  const { userchatId } = route.params;

  const [status, setStatus] = useState(null);
  const [otherUsers, setOtherUsers] = useState({});
  const initialRegion = {
    latitude: 22.5726,    // Latitude of Kolkata
    longitude: 88.3639,   // Longitude of Kolkata
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await askLocationPermission();
      setStatus(result);
      
      if (result) {
        const { coords } = result;
        set(
          ref(
            getDatabase(),
            `location/${userchatId}/` + auth.currentUser.email.replace(/[@.]/g, "")
          ),
          {
            lat: coords.latitude,
            lng: coords.longitude,
          }
        );
      }
    };

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

  return (
    <View style={styles.container}>
      {status && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {Object.entries(otherUsers).map(([userEmail, userLocation]) => (
            <Marker
              key={userEmail}
              coordinate={{
                latitude: userLocation.lat,
                longitude: userLocation.lng,
              }}
              title={userEmail}
            />
          ))}
          {status.coords && (
            <Marker
              key={"userLocation"}
              coordinate={{
                latitude: status.coords.latitude,
                longitude: status.coords.longitude,
              }}
              title={auth.currentUser.email.replace(/[@.]/g, "")}
            />
          )}
          {status.coords && otherUsers[userchatId] && (
            <MapViewDirections
              origin={{
                latitude: status.coords.latitude,
                longitude: status.coords.longitude,
              }}
              destination={{
                latitude: otherUsers[userchatId]?.lat,
                longitude: otherUsers[userchatId]?.lng,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="hotpink"
              trafficModel="best_guess"
              optimizeWaypoints={true}
              mode="DRIVING"
            />
          )}
        </MapView>
      )}
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
