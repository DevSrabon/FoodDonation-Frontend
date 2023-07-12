import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { userContext } from "../context/Provider";
import { all } from "axios";
import { useRoute } from "@react-navigation/native";
import useFetchData from "../hook/useFetchData";
import MapViewDirections from "react-native-maps-directions";

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
const GOOGLE_MAPS_APIKEY = "AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ";
const RoutesMap = () => {
  const route = useRoute();
  const initialRegion = {
    latitude: 24.8486,
    longitude: 89.3711,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const realTime= async () => {
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
          latitude: coords.latitude,
          longitude: coords.longitude,
        }
      );
    }
  };
  const updateRealTime = () => {
    setInterval(realTime, 5000); 
  };

  const { userchatId } = route.params;
  const { allData } = userContext();
  const { emaill } = route.params;
  const { loading, error, data } = useFetchData(`users?email=${emaill}`);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    if (allData.userData?.location && data?.location) {
      // Calculate the shortest route between the two locations
      const origin = {
        latitude: allData.userData.location.latitude,
        longitude: allData.userData.location.longitude,
      };

      const destination = {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      };

      setDirections([{ origin, destination }]);
    }
  }, [allData, data]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        {allData.userData?.location && (
          <Marker
            coordinate={{
              latitude: allData.userData.location.latitude,
              longitude: allData.userData.location.longitude,
            }}
          />
        )}
        {data?.location && (
          <Marker
            coordinate={{
              latitude: data.location.latitude,
              longitude: data.location.longitude,
            }}
            pinColor="yellow" // Set marker color to yellow
          />
        )}
        {directions.map((direction, index) => (
          <MapViewDirections
            key={index}
            origin={direction.origin}
            destination={direction.destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
          />
        ))}
      </MapView>
    </View>
  );
};

export default RoutesMap;

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
