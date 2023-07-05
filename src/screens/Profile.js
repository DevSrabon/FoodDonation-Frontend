import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Label from "../components/label";
import { userContext } from "../context/Provider";
import useImagePicker from "../hook/useImagePicker";

const Profile = () => {

  const route = useRoute();
  const role=route.params.role;
  const subrole=route.params.subrole;

  const { loading: imageLoading, imageUrls, takePhoto } = useImagePicker();

  const [bio, setBio] = useState("");
  const navigation = useNavigation();
  const { user, loading, setLoading } = userContext();

  const onBioSetup = async () => {
    if (!imageUrls.length || !bio) return alert("Please fill up your bio");
    const body = { bio, photo: imageUrls[0] };
    try {
      const result = await axios.patch(
        `https://food-donation-backend.vercel.app/api/v1/users/update-role?email=${user?.email}`,
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

  if (loading || imageLoading) return <Loading />;

  return (
    <ScrollView>
      <View style={{ flex: 1, marginBottom: 30 }}>
        <View>
          <View
            style={{ marginLeft: 20, alignItems: "center", marginBottom: 50 }}
          >
            <Header> Your Profile</Header>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {!imageUrls.length ? (
              <>
                <TouchableOpacity
                  onPress={takePhoto}
                  style={{ width: "100%", height: "30%", borderColor: "red" }}
                >
                  {loading ? (
                    <>
                      <View style={{}}>
                        <ActivityIndicator style={{ color: "yellow" }} />
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        height: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Bold",
                          fontSize: 10,
                          color: "red",
                          height: 80,
                        }}
                      >
                        <Image source={icons.profile} />
                      </Text>
                      <Text>Add Image</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <View style={{ height: 80 }}>
                {imageUrls?.length && (
                  <Image
                    style={{ height: 40, width: 40, borderRadius: 50 }}
                    source={{ uri: imageUrls?.[imageUrls.length - 1] }}
                  />
                )}
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 150,
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

        <CustomButton text="Done" onPress={onBioSetup} type="primary" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
export default Profile;

// const SERVER_URL = "http://localhost:3000";

// const [photo, setPhoto] = useState(null);

// const createFormData = (photo, body = {}) => {
//   const data = new FormData();

//   data.append("photo", {
//     name: photo.fileName,
//     type: photo.type,
//     uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
//     uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
//   });

//   Object.keys(body).forEach((key) => {
//     data.append(key, body[key]);
//   });

//   return data;
// };

// const handleChoosePhoto = () => {
//   launchImageLibrary({ noData: true }, (response) => {
//     // console.log(response);
//     if (response) {
//       setPhoto(response);
//     }
//   });
// };

// const handleUploadPhoto = () => {
//   fetch(`${SERVER_URL}/api/upload`, {
//     method: "POST",
//     body: createFormData(photo, { userId: "123" }),
//     method: "POST",
//     body: createFormData(photo, { userId: "123" }),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       console.log("response", response);
//       console.log("response", response);
//     })
//     .catch((error) => {
//       console.log("error", error);
//       console.log("error", error);
//     });
// };
