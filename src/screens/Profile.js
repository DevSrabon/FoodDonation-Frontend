import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import icons from "../../assets/icons";
import { TextInput } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const onBioSetup = () => {
    console.warn("continue");
  };
  const [bio, setBio] = useState();
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={{ fontFamily: "SemiBold", fontSize: 28, marginTop: 30 }}>
          Your Profile
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignSelf: "center",
          marginTop: 50,
        }}
      >
        <Text
          style={{ fontFamily: "SemiBold", fontSize: 14, marginBottom: 10 }}
        >
          Profile Picture
        </Text>
        <View style={{ alignSelf: "center" }}>
          <Image source={icons.profile} />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          bottom: 100,
        }}
      >
        <Text
          style={{ fontFamily: "SemiBold", fontSize: 14, marginRight: 330 }}
        >
          Bio
        </Text>

        <CustomInput
          placeholder="About Yourself"
          value={bio}
          setValue={setBio}
          multiline={true}
          numberOfLines={10}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          bottom: 120,
        }}
      >
        <CustomButton text="Done" onPress={onBioSetup} type="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default Profile;
