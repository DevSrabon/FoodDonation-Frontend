import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AddImages from "../components/AddImages";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";
import useImagePicker from "../hook/useImagePicker";
import Container from "../components/container";
import Label from "../components/label";
import Header from "../components/Header";
import icons from "../../assets/icons";
import CustomInput from "../components/CustomInput";

const Donate = () => {
  const { loading: imageLoading, imageUrls, takePhoto } = useImagePicker();

  const { loading, setLoading, allData } = useContext(AuthContext);
  const { name, role, subRole, email, location, categoryName, phone } =
    allData.userData;
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [caption, setCaption] = useState("");
  const [noOfItem, setNoOfItem] = useState("");
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
      caption,
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
    <ScrollView style={{ flex: 1 }}>
      <Container>
        <Header>Donate</Header>
        <View
          style={{
            flex: 1,
            alignSelf: "flex-start",
            justifyContent: "flex-start",
            gap: 10,
            bottom: 100,
          }}
        >
          <Label>{subRole}</Label>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <Image source={icons.location} style={{ marginRight: 0 }} />
            <Label>{address}</Label>
          </View>
        </View>
        <View style={styles.inputCon}>
          <Label>Caption</Label>
          <CustomInput
            placeholder="Caption"
            value={caption}
            setValue={setCaption}
          />
        </View>
        <View style={styles.inputCon}>
          <Label>No of Items</Label>
          <CustomInput
            placeholder="No of Items"
            keyboardType="numeric"
            value={noOfItem}
            setValue={handleNumberChange}
          />
        </View>

        <AddImages imageUrls={imageUrls} takePhoto={takePhoto} />

        {/* <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        placeholder="No of Items"
        value={noOfItem}
        onChangeText={handleNumberChange}
      /> */}
        <View style={{ flex: 1, width: "90%" }}>
          <CustomButton text="Continue" onPress={onDonate} type="primary" />
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputCon: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    bottom: 130,
  },
  disabledText: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 40,
    backgroundColor: "#f2f2f2",
  },
  inputText: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 40,
  },
  imageHeader: {
    height: 40,
    flexDirection: "row",
    marginRight: 20,
    justifyContent: "space-between",
  },
  imageHeaderText: {
    fontFamily: "SemiBold",
    fontSize: 20,
    top: 6,
  },
  addButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonLabel: {
    color: "gray",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    height: 80,
    flexDirection: "row",
    gap: 5,
    marginRight: 20,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "stretch",
    backgroundColor: "black",
    borderRadius: 8,
  },
});

export default Donate;
