import axios from "axios";
import React, { useState } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Image,
  Text,

  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as ImagePicker from "../firebase/firebase.config";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";


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
import { getDefaultHeaderHeight } from "@react-navigation/elements";


const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uploadURL = await uploadImageAsync(result.assets[0].uri);
      setImage(uploadURL);
      // uploadImageAsync(result.assets[0].uri);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setImage(null);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    }
  }

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      }
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"))
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    try {
      const storageRef = ref(storage, `Images/image-${Date.now()}`)
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      return await getDownloadURL(storageRef)

    } catch (error) {
      alert(`Error : ${error}`);

    }
  }

  const [bio, setBio] = useState("");
  const navigation = useNavigation();
  const { user, loading, setLoading } = userContext();

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
    <ScrollView >
      <View style={{ flex: 1, marginBottom: 30 }}>
        <View>
          <View style={{ marginLeft: 20, alignItems: "center", marginBottom: 50 }}>
            <Header> Your Profile</Header>
          </View>
          {!image ? (
            <>
              <TouchableOpacity
                onPress={pickImage}
                style={{ width: '100%', height: '30%', borderColor: "red" }}
              >

                {isLoading ? (
                  <>
                    <View style={{}}>
                      <ActivityIndicator
                        style={{ color: 'yellow' }}
                      />
                    </View>
                  </>
                ) : (
                  <View style={{ height: 'auto' }}>
                    <Text
                      style={{ fontFamily: "Bold", fontSize: 10, color: "red", height: 100 }}
                    >
                      <Image source={icons.profile} />
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              {image && (
                <Image source={{ uri: image }} />
              )}
              <Button title="Delete this image" />
            </>
          )}
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

const styles = StyleSheet.create({

});
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