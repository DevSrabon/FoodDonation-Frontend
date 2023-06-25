import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import icons from "../../assets/icons";
import InitContainer from "../components/initContainer";

const InitialPage = () => {
  const navigation = useNavigation();

  return (
    <InitContainer>
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
    </InitContainer>
  );
};

const styles = StyleSheet.create({
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
