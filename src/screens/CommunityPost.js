import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AddImages from "../components/AddImages";
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import Label from "../components/label";
import { userContext } from "../context/Provider";
import useImagePicker from "../hook/useImagePicker";

const CommunityPost = () => {
  const { loading: imageLoading, imageUrls, takePhoto } = useImagePicker();

  const { allData, setRefetch } = userContext();
  const { role, subRole, email, photo } = allData.userData;
  const navigation = useNavigation();
  const [yourName, setYourName] = useState("");
  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [noOfItem, setNoOfItem] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setSelectedDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const onClicked = async () => {
    if (
      imageUrls.length === 0 ||
      !yourName ||
      !organization ||
      !address ||
      !description ||
      !noOfItem ||
      !selectedDate
    ) {
      return setError(
        "Please fill in all the fields and select at least 1 image."
      );
    }
    setLoading(true);
    const body = {
      name: yourName,
      location: address,
      description,
      noOfItem,
      date: selectedDate,
      organization,
      imageUrls,
      role,
      subRole,
      email,
      photo,
    };
    try {
      const res = await axios.post(
        `https://food-donation-backend.vercel.app/api/v1/community/create`,
        body
      );
      if (res.data.status === "success") {
        // alert("Submitted");
        setRefetch(true);
        // setSuccess("Submitted");
        navigation.navigate("community");
      }
    } catch (error) {
      setError(error.message);
      // alert(error.message);
    }
  };
  if (imageLoading || loading) {
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
            numberOfLines={10}
          />

          <Label>No of Items</Label>
          <CustomInput
            placeholder="No of Items"
            keyboardType="numeric"
            value={noOfItem}
            setValue={setNoOfItem}
          />

          <Label>Date of Donation</Label>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
            />
          )}
          {!showPicker && (
            <Pressable
              style={{ width: "100%", marginLeft: 35 }}
              onPress={toggleDatePicker}
            >
              <CustomInput
                placeholder={date.toDateString()}
                value={selectedDate}
                editable={false}
              />
            </Pressable>
          )}
          <AddImages imageUrls={imageUrls} takePhoto={takePhoto} />
        </View>

        <View
          style={{
            flex: 1,
            alignSelf: "center",
            width: "90%",
          }}
        >
          {error && <CustomAlert type="error" value={error} />}
          {success && <CustomAlert type="success" value={success} />}

          <CustomButton text="Continue" onPress={onClicked} type="primary" />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default CommunityPost;
