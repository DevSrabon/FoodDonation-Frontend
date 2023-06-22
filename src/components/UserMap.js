import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import icons from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "./CustomInput";

const origin = { latitude: 11.70484, longitude: 92.715733 };
const GOOGLE_MAPS_APIKEY = "AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ";

const UserMap = () => {
  const navigation = useNavigation();
  const [serach, setSearch] = useState(0);

  return (
    <View style={styles.mapContainer}>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 400,
          paddingVertical: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontFamily: "SemiBold", fontSize: 20 }}>
            <Text
              style={{ fontFamily: "SemiBold", fontSize: 18, color: "#B4AAF2" }}
            >
              {" "}
              Wellcome,
            </Text>{" "}
            Paul
          </Text>
          <Image source={icons.notification} />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 15,
          }}
        >
          <CustomInput
            placeholder="Search here"
            value={serach}
            setValue={setSearch}
          />
          <Image source={icons.settings} />
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 11.70484,
          longitude: 92.715733,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          title="user"
          description="this is user info"
          coordinate={{
            latitude: 11.70484,
            longitude: 92.715733,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    //the container will fill the whole screen.
    // justifyContent: "flex-end",
    // alignItems: "center",
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 100,
    marginBottom: 50,
    marginHorizontal: 15,
  },
});

export default UserMap;
