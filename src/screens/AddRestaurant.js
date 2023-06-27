import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import axios from "axios";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Loading from "../components/Loading";
import { userContext } from "../context/Provider";

import Container from "../components/container";

import Header from "../components/Header";
import Label from "../components/label";

const AddRestaurant = () => {
  // const { loading, setLoading } = useContext(AuthContext);
  const navigation = useNavigation();

  const [categoryName, setCategoryName] = useState("");
  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  const [fssaiLicense, setFSSAILicense] = useState("");
  const [panNumber, setPanNumber] = useState("");
  // const { loading, error, updateUserRole } = useUpdateUser();
  const { user, loading, setLoading } = userContext();
  const onAddRestaurant = async () => {
    if (
      !categoryName ||
      !location?.latitude ||
      !location?.longitude ||
      !fssaiLicense ||
      !panNumber
    )
      return alert("Please fill-up all the information");
    const body = {
      categoryName,
      location: location,
      fssaiLicense,
      panNumber,
      email: user?.email,
    };
    try {
      const result = await axios.patch(
        "https://food-donation-backend.vercel.app/api/v1/users/update-role",
        body
      );
      if (result.data.status === "success")
        return navigation.navigate("profile");
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

  if (loading) {
    return <Loading />;
  }

  const onImageUpload = () => {
    console.warn("image upload");
  };

  const onPressAddress = (data, details) => {
    const latitude = details.geometry.location.lat;
    const longitude = details.geometry.location.lng;

    setLocation((prev) => ({ ...prev, latitude, longitude }));
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Container>
        <Header>Add Restaurant</Header>
        <Label>Restaurant Name</Label>
        <CustomInput
          placeholder="Restaurant Name"
          value={categoryName}
          setValue={setCategoryName}
        />
        {/* Image add part */}

        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Label>Image</Label>
          <CustomButton text="Add+" onPress={onImageUpload} type="tertiary" />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 80,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Image style={styles.stretch} source={icons.google} />
          <Image style={styles.stretch} source={icons.google} />
          <Image style={styles.stretch} source={icons.google} />
          <Image style={styles.stretch} source={icons.google} />
        </View>

        {/* Location */}
        <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
          <Label>Location</Label>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Location"
            onPress={onPressAddress}
            query={{
              key: "AIzaSyDnSNNGQQ8AhLEmcsXJbmz1_MVrbOz55rM",
              language: "en",
            }}
            styles={{
              textInputContainer: styles.containerStyle,
              textInput: styles.textInputStyle,
            }}
          />
        </View>

        {/* FSSAI License */}
        <Label>FSSAI License</Label>
        <CustomInput
          placeholder="FSSAI License"
          value={fssaiLicense}
          setValue={setFSSAILicense}
        />

        {/* PAN number */}
        <Label>PAN number</Label>
        <CustomInput
          placeholder="PAN Number"
          value={panNumber}
          setValue={setPanNumber}
          secureTextEntry={true}
        />
        <View style={{ flex: 1, width: "90%" }}>
          <CustomButton
            text="Continue"
            onPress={onAddRestaurant}
            type="primary"
          />
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  stretch: {
    width: 60,
    height: 60,
    resizeMode: "stretch",
    backgroundColor: "black",
    borderRadius: 8,
  },
  containerStyle: {
    borderColor: "#A2A2A6",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 2,
    marginVertical: 5,
  },
  textInputStyle: {
    // fontSize: 16,
  },
});

export default AddRestaurant;
