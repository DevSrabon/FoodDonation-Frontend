import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import icons from "../../assets/icons";
import { userContext } from "../context/Provider";
import useFetchData from "../hook/useFetchData";
import CustomInput from "./CustomInput";
import Loading from "./Loading";

const origin = { latitude: 11.70484, longitude: 92.715733 };
const GOOGLE_MAPS_APIKEY = "AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ";

const UserMap = () => {
  const navigation = useNavigation();
  const [serach, setSearch] = useState(0);
  const { user } = userContext();
  const { loading, error, data } = useFetchData(`users?email=${user?.email}`);

  console.log("🚀 ~ file: UserMap.js:20 ~ UserMap ~ data:", data);
  if (loading) return <Loading />;

  if (error) return alert(error);

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
            {data?.data?.name}
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
          ...data?.data?.location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          title={data?.data?.restaurantName}
          description={data?.data?.bio}
          coordinate={{
            ...data?.data?.location,
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
