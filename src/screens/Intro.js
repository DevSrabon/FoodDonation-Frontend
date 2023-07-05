import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import data from "../data/introData";
import icons from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import InitContainer from "../components/initContainer";
import LottieView from "lottie-react-native";

const Intro = () => {
  const navigation = useNavigation();
  return (
    <InitContainer>
      <LottieView
        style={{ width: 300, top: 30 }}
        key="animation"
        autoPlay
        loop
        resizeMode="center"
        source={require("../../assets/donate.json")}
      />
      {/* <View style={{ width: "40%" }}></View> */}

      <View style={styles.topContainer}></View>
      <View style={styles.subContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                maxWidth: 400,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: 24,
                  textAlign: "center",
                  //   paddingVertical: 10,
                  top: -20,
                }}
              >
                {item.header}
              </Text>
              <Text
                style={{
                  fontFamily: "SemiBold",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                {item.details}
              </Text>
              <Pressable onPress={() => navigation.navigate("login")}>
                <Image source={icons.rightArrow} style={{ top: 30 }} />
              </Pressable>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </View>
    </InitContainer>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    // backgroundColor: "#B4AAF2",
  },
  subContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopStartRadius: 17,
    borderTopEndRadius: 17,
    maxHeight: 300,
    padding: 10,
    justifyContent: "flex-start",
  },
});

export default Intro;
