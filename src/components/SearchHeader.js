import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { userContext } from "../context/Provider";
import Loading from "./Loading";
import { Ionicons } from "@expo/vector-icons";

const SearchHeader = () => {
  const { allData, user, loading, signOutUser } = userContext();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    if (user?.email) {
      await signOutUser();
      navigation.navigate("initial");
    } else {
      navigation.navigate("login");
    }
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
        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
          <Ionicons name="ios-settings-outline" size={30} color="#B4AAF2" />
          {/* <Ionicons name="settings" size={30} color="#B4AAF2" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 8,
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
