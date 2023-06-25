import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import icons from "../../assets/icons";
import { userContext } from "../context/Provider";

const InitialPage = () => {
  const navigation = useNavigation();
  const { user, signOutUser } = userContext();
  useEffect(() => {
    if (user?.email) {
      signOutUser;
      AsyncStorage.removeItem("jwtToken");
    }
    // checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const storedToken = await AsyncStorage.getItem("jwtToken");
    if (storedToken) {
      navigation.navigate("login");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Food Donation. </Text>

      <View style={{ paddingRight: 45, paddingLeft: 30 }}>
        <Text style={styles.detail}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus, est ac
          iaculis euismod
        </Text>

        <Pressable onPress={() => navigation.navigate("intro")}>
          <Image source={icons.InitialBtn} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B4AAF2",
    // marginTop: StatusBar.currentHeight,
  },
  header: {
    position: "absolute",
    fontFamily: "Bold",
    fontSize: 40,
    lineHeight: 46,
    textAlign: "center",
    justifyContent: "center",
    // paddingHorizontal: 20,
    marginHorizontal: 70,
  },
  detail: {
    fontFamily: "Regular",
    paddingLeft: 30,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    // paddingTop: 100,
    marginTop: 400,
  },
  icon: {
    marginRight: 220,
    marginTop: 120,
  },
});

export default InitialPage;
