import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { userContext } from "../context/Provider";
import Loading from "./Loading";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

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
        {/* <View style={{ width: "50%" }}>
          <CustomButton
            text="Donate"
            onPress={() => navigation.navigate("donate")}
            type="primary"
          />
        </View> */}

        <TouchableOpacity onPress={() => navigation.navigate("donate")}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#B4AAF2",

              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 8,
              gap: 3,
              alignItems: "center",
            }}
          >
            <FontAwesome name="dollar" size={16} color="white" />
            <Text
              style={{
                color: "white",
                fontFamily: "Medium",
                fontSize: 16,
              }}
            >
              Donate
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
          <Ionicons name="ios-settings-outline" size={30} color="#B4AAF2" />
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
