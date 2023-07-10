import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { userContext } from "../context/Provider";
import useFetchData from "../hook/useFetchData";
import Loading from "./Loading";
import MapCallout from "./MapCallout";
import SearchHeader from "./SearchHeader";

const origin = { latitude: 11.70484, longitude: 92.715733 };
const GOOGLE_MAPS_APIKEY = "AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ";

const UserMap = () => {
  const navigation = useNavigation();
  const [serach, setSearch] = useState(0);
  const { user, setAllData } = userContext();
  // const { loading, error, data } = useFetchData(`users?email=srabon3@gmail.com`);
  const { loading, error, data } = useFetchData(`users?email=${user?.email}`);
  const { data: mapUsers, loading: isLoading } = useFetchData(
    `users/map?latitude=${data?.location?.latitude}&longitude=${data?.location?.longitude}&role=${data?.role}`
  );
  useEffect(() => {
    if (data && mapUsers) {
      setAllData((prev) => ({
        ...prev,
        userData: data,
        mapUsers: [...mapUsers],
      }));
    }
  }, [data, mapUsers, setAllData]);
  if (loading || isLoading) return <Loading />;

  // if (error) alert(error.message);

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
          coordinate={{
            ...data?.location,
          }}
        >
          <Callout
            onPress={() => navigation.navigate("donorPage", { user: data })}
          >
            <MapCallout user={data} />
          </Callout>
        </Marker>

        {mapUsers
          ? mapUsers?.map((user) => (
              <Marker
                key={user?._id}
                pinColor="yellow"
                coordinate={{
                  ...user?.location,
                }}
              >
                <Callout
                  onPress={() => navigation.navigate("donorPage", { user })}
                >
                  <MapCallout user={user} key={user?._id}></MapCallout>
                </Callout>
              </Marker>
            ))
          : null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
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
