import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { userContext } from "../context/Provider";
import Loading from "./Loading";

const SearchHeader = () => {
  const [search, setSearch] = useState(0);
  const { allData, user, loading, signOutUser } = userContext();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    if (user?.email) {
      await signOutUser();
      navigation.navigate("initial");
    } else {
      navigation.navigate("login");
    }

    // const handleAppStateChange = async (nextAppState) => {
    //   if (nextAppState === "inactive" || nextAppState === "background") {
    //     await AsyncStorage.removeItem("@mahbubmorshed");
    //   }
    // };

    // AppState.addEventListener("change", handleAppStateChange);

    // Cleanup function to remove the event listener
    // return () => {
    //   AppState.removeEventListener("change", handleAppStateChange);
    // };
  };

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.typography}>
            <Text style={{ fontSize: 18, color: "#B4AAF2" }}> Welcome,</Text>{" "}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {allData?.userData?.name || "Guest"}
          </Text>
        </View>
        {/* <Image source={icons.notification} /> */}
        <View style={styles.searchView}>
          <Text
            onPress={handleSignOut}
            style={{
              backgroundColor: "#B4AAF2",
              padding: 8,
              borderRadius: 10,
              color: "white",
            }}
          >
            Log out
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 10,
  },
  searchView: {
    justifyContent: "flex-end",
    marginHorizontal: 15,
  },
  typography: {
    fontFamily: "SemiBold",
    fontSize: 20,
  },
});

export default SearchHeader;
