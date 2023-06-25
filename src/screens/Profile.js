import { useNavigation } from "@react-navigation/native";
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
import { launchImageLibrary } from "react-native-image-picker";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Loading from "../components/Loading";
import { userContext } from "../context/Provider";

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
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onBioSetup = async () => {
    const body = { bio, email: user?.email };
    try {
      const result = await axios.patch(
        "https://food-donation-backend.vercel.app/api/v1/users/update-role",
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
    <ScrollView>
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
          <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
            Profile Picture
          </Text>
          <View style={{ alignSelf: "center", height: 200 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {photo && (
                <>
                  <Image
                    source={{ uri: photo.uri }}
                    style={{ width: 300, height: 300 }}
                  />
                  <Button title="Upload Photo" onPress={handleUploadPhoto} />
                </>
              )}
              <Button title="Choose Photo" onPress={handleChoosePhoto} />
            </View>
            {/* <Image source={icons.profile} /> */}
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
    </ScrollView>
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
