import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import icons from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";

const InitialPage = () => {
  const navigation = useNavigation();
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
    fontFamily: "Reguler",
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
