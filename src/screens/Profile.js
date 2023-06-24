import { View, Text, StyleSheet, ScrollView, Image, Button, Platform } from "react-native";
import React, { useState } from "react";
import icons from "../../assets/icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';

const SERVER_URL = 'http://localhost:3000';

const Profile = () => {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
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
      method: 'POST',
      body: createFormData(photo, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };



  const onBioSetup = () => {
    console.warn("continue");
  };

  const [bio, setBio] = useState();
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
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14 }}
          >
            Profile Picture
          </Text>
          <View style={{ alignSelf: "center", height: 200 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
