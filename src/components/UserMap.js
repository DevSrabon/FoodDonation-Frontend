import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { userContext } from "../context/Provider";
import useFetchData from "../hook/useFetchData";
import Loading from "./Loading";
import SearchHeader from "./SearchHeader";
import MapModal from "./MapModal";

const origin = { latitude: 11.70484, longitude: 92.715733 };
const GOOGLE_MAPS_APIKEY = "AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ";

const UserMap = () => {
  const navigation = useNavigation();
  const [serach, setSearch] = useState(0);
  const { user, setAllData } = userContext();
  const { loading, error, data } = useFetchData(`users?email=${user?.email}`);
  const { data: mapUsers } = useFetchData(
    `users/map?latitude=${data?.location?.latitude}&longitude=${data?.location?.longitude}&role=${data?.role}`
  );
  useEffect(() => {
    if (data) {
      setAllData((prev) => ({ ...prev, userData: data }));
    }
  }, [data, setAllData]);
  if (loading) return <Loading />;

  if (error) return alert(error);

  return (
    <View style={styles.mapContainer}>
      <SearchHeader />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...data?.location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          pinColor="red"
          title={data?.categoryName}
          description={data?.role}
          coordinate={{
            ...data?.location,
          }}
          onPress={() => {
            <MapModal />;
          }}
        />
        {mapUsers?.map((user, i) => (
          <Marker
            key={i}
            title={user.categoryName}
            description={user?.role}
            pinColor="yellow"
            coordinate={{
              ...user?.location,
            }}
          />
        ))}
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
