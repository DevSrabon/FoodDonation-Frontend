import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import Container from "../components/container";
import CustomInput from "../components/CustomInput";
import Loading from "../components/Loading";
import { userContext } from "../context/Provider";
import Header from "../components/Header";
import icons from "../../assets/icons";
import Label from "../components/label";

const SERVER_URL = "http://localhost:3000";

const Profile = () => {
  const [bio, setBio] = useState("");
  const navigation = useNavigation();
  const { user, loading, setLoading } = userContext();

  const [photo, setPhoto] = useState(null);

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
      uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/api/upload`, {
      method: "POST",
      body: createFormData(photo, { userId: "123" }),
      method: "POST",
      body: createFormData(photo, { userId: "123" }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
        console.log("error", error);
      });
  };

  const onBioSetup = async () => {
    if (!bio) return alert("Please fill up your bio");
    const body = { bio, email: user?.email };
    try {
      const result = await axios.patch(
        "https://food-donation-backend.vercel.app/api/v1/users/update-bio",
        body
      );
      if (result.data.status === "success") return navigation.navigate("user");
    } catch (error) {
      if (error.code === "This-restaurant-already-in-use") {
        alert("The Restaurant is already in use");
      } else {
        console.log("Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ScrollView style={{ flex: 1 }}>
      <Container>
        <Header> Your Profile</Header>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            bottom: 130,
          }}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, marginBottom: 5 }}
          >
            Profile Picture
          </Text>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              // borderColor: "red",
              width: 55,
              height: 55,
              borderRadius: 50,
              // borderWidth: 1,
            }}
          >
            <Image source={icons.profile} />
          </View>
          {photo && (
            <>
              <Image
                source={{ uri: photo.uri }}
                style={{
                  width: 300,
                  height: 300,
                }}
              />

              <Button title="Upload Photo" onPress={handleUploadPhoto} />
            </>
          )}
          <Button title="Choose Photo" onPress={handleChoosePhoto} />
        </View>

        {/* <Image source={icons.profile} /> */}

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            bottom: 170,
          }}
        >
          <Label>Bio</Label>
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
            bottom: 220,
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        >
          <CustomButton text="Done" onPress={onBioSetup} type="primary" />
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Profile;
