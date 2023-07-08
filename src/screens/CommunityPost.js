import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import icons from "../../assets/icons";
import AddImages from "../components/AddImages";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import Label from "../components/label";
import { AuthContext } from "../context/Provider";
import useImagePicker from "../hook/useImagePicker";

const CommunityPost = () => {
  const { loading: imageLoading, imageUrls, takePhoto } = useImagePicker();

  const { loading, setLoading, allData } = useContext(AuthContext);
  const { name, role, subRole, email, location, categoryName, phone, photo } =
    allData.userData;
  const navigation = useNavigation();
  const [yourName, setYourName] = useState("");
  const [organization, setOrganization] = useState("");

  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [noOfItem, setNoOfItem] = useState("");
  const [dateTime, setDateTime] = useState("");
  const longitude = location?.longitude;
  const latitude = location?.latitude;
  const handleNumberChange = (value) => {
    // Remove non-numeric characters
    const formattedValue = value.replace(/[^0-9]/g, "");
    setNoOfItem(formattedValue);
  };

  const onDonate = () => {
    if (imageUrls > 4 || caption === "")
      return Alert.alert(
        "Please Select at Least 4 image and fill up all input field"
      );
    const body = {
      userName: name,
      postCategoryName: categoryName,
      email,
      location,
      role,
      subRole,
      photo,
      caption,
      phone,
      noOfItem,
      imageUrls,
    };
    navigation.navigate("communityItem", {
      number: noOfItem,
      resData: body,
    });
  };

  const getAddressFromCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ`
      );

      const results = response.data.results;
      if (results.length) {
        const formattedAddress = results[0].formatted_address;
        setAddress(formattedAddress);
      } else {
        setAddress("No results found");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getAddressFromCoordinates();
  }, [latitude, longitude]);

  if (loading || imageLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header>Community Post</Header>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Label>Your Name</Label>
          <CustomInput
            placeholder="Your Name"
            value={yourName}
            setValue={setYourName}
          />

          <Label>Organization</Label>
          <CustomInput
            placeholder="Organization"
            value={organization}
            setValue={setOrganization}
          />

          <Label>Location</Label>
          <CustomInput
            placeholder="Event Location"
            value={address}
            setValue={setAddress}
          />

          <Label>Description</Label>
          <CustomInput
            placeholder="Description of event"
            value={description}
            setValue={setDescription}
          />

          <Label>No of Items</Label>
          <CustomInput
            placeholder="No of Items"
            keyboardType="numeric"
            value={noOfItem}
            setValue={handleNumberChange}
          />
          <Label>Date and Time</Label>
          <CustomInput
            placeholder="Date and Time"
            value={dateTime}
            setValue={setDateTime}
          />

          <AddImages imageUrls={imageUrls} takePhoto={takePhoto} />
        </View>

        <View
          style={{
            flex: 1,
            alignSelf: "center",
            width: "90%",
          }}
        >
          <CustomButton text="Continue" onPress={onDonate} type="primary" />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({});
export default CommunityPost;
