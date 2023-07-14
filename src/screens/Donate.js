import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddImages from "../components/AddImages";
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import Label from "../components/label";
import { AuthContext } from "../context/Provider";
import useImagePicker from "../hook/useImagePicker";
import TextField from "../components/TextField";

const Donate = () => {
  const { loading: imageLoading, imageUrls, takePhoto } = useImagePicker();

  const { loading, setLoading, allData } = useContext(AuthContext);
  const { name, role, subRole, email, location, categoryName, phone, photo } =
    allData.userData;

  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [caption, setCaption] = useState("");
  const [noOfItem, setNoOfItem] = useState("");

  const [error, setError] = useState("");

  const longitude = location?.longitude;
  const latitude = location?.latitude;

  const handleNumberChange = (value) => {
    // Remove non-numeric characters
    const formattedValue = value.replace(/[^0-9]/g, "");
    setNoOfItem(formattedValue);
  };

  const onDonate = () => {
    if (!imageUrls.length || !caption || !noOfItem)
      return setError(
        "Please Select at Least 1 image and fill up all input field"
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
    navigation.navigate("DonateMeal", {
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
      <Header>{role === "donor" ? "Donate" : "Help"}</Header>
      <ScrollView style={{ flex: 1 }}>
        <Label>Organization Name:</Label>
        <View style={styles.textPadding}>
          <Text style={styles.textBox}>{categoryName}</Text>
        </View>

        <Label>Location:</Label>
        <View style={styles.textPadding}>
          <Text style={styles.textBox}>
            {address?.includes(",")
              ? address?.substring(address?.indexOf(",") + 1).trim()
              : address}
          </Text>
        </View>

        <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
          {/* <Label>Donation Description</Label>
          <CustomInput
            placeholder="Donation Description"
            value={caption}
            setValue={setCaption}
          /> */}

          <TextField
            placeholder="Donation Description"
            value={caption}
            setValue={setCaption}
          />

          {/* <Label>No of Items</Label>
          <CustomInput
            placeholder="No of Items"
            keyboardType="numeric"
            value={noOfItem}
            setValue={handleNumberChange}
          /> */}

          <TextField
            placeholder="No of Items"
            keyboardType="numeric"
            value={noOfItem}
            setValue={handleNumberChange}
          />
        </View>

        <AddImages imageUrls={imageUrls} takePhoto={takePhoto} />

        <View style={styles.btnContainer}>
          {error && <CustomAlert type="error" value={error} />}
          <CustomButton text="Continue" onPress={onDonate} type="primary" />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  textPadding: {
    color: "#fff",

    paddingVertical: 5,
    textAlign: "center",
  },
  textContainer: {
    marginLeft: 15,
    gap: 5,
  },
  text: {
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  textBox: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#efedf8",
    borderWidth: 1,
    borderColor: "#B4AAF2",
    borderRadius: 8,
    padding: 10,
  },
  btnContainer: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
  },
});

export default Donate;
