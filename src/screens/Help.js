import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import AddImages from "../components/AddImages";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import Label from "../components/label";
import { AuthContext } from "../context/Provider";
import { listFiles, uploadToFirebase } from "../firebase/firebase.config";

const Donate = () => {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    listFiles().then((listResp) => {
      const files = listResp.map((value) => {
        return { name: value.fullPath };
      });

      setFiles(files);
    });
  }, []);

  // console.log(files);

  const takePhoto = async () => {
    setLoading(true);
    try {
      const cameraResp = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split("/").pop();
        const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
          console.log(v)
        );
        // console.log(uploadResp);

        listFiles().then((listResp) => {
          const files = listResp.map((value) => {
            return { name: value.fullPath };
          });
          setImageUrls((prevUrls) => [...prevUrls, uploadResp.downloadUrl]);

          setFiles(files);
        });
      }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const { loading, setLoading, allData } = useContext(AuthContext);
  const { name, role, subRole, email, location, categoryName, phone, photo } =
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
    if (imageUrls > 1 || caption === "")
      return Alert.alert(
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
    navigation.navigate("helpMeal", {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <ScrollView>
        <Header>Help</Header>
        <View style={{ flex: 1, alignSelf: "flex-start", bottom: 50 }}>
          <Label>Organization Name</Label>
          <Label>{categoryName}</Label>
          <Label>Location</Label>
          <Label>{address}</Label>
        </View>

        <View
          style={{ flex: 1, width: "100%", alignItems: "center", bottom: 70 }}
        >
          <Label>Caption</Label>
          <CustomInput
            placeholder="Caption"
            value={caption}
            setValue={setCaption}
          />

          <Label>No of Items</Label>
          <CustomInput
            placeholder="No of Items"
            keyboardType="numeric"
            value={noOfItem}
            setValue={handleNumberChange}
          />
        </View>

        <AddImages imageUrls={imageUrls} takePhoto={takePhoto} />

        {/* Image */}
        {/* <View
        style={{
          flex: 1,
          height: 120,

          alignItems: "center",
          justifyContent: "space-between",
        }}
      > */}
        {/* <View style={styles.imageHeader}>
          <Text style={styles.imageHeaderText}>Image</Text>
          <TouchableOpacity onPress={takePhoto} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Add+</Text>
          </TouchableOpacity>
        </View> */}

        {/* <View style={styles.imageContainer}>
        {imageUrls.length > 0 &&
          imageUrls.map((img, index) => (
            <Image key={index} style={styles.image} source={{ uri: img }} />
          ))}
      </View> */}
        {/* </View> */}

        {/* No of items */}

        {/* <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
          No of Items
        </Text>
        <TextInput
          style={styles.inputText}
          keyboardType="numeric"
          placeholder="No of Items"
          value={noOfItem}
          onChangeText={handleNumberChange}
        /> */}
        <View style={{ flex: 1, width: "90%", bottom: 10 }}>
          <CustomButton text="Continue" onPress={onDonate} type="primary" />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
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
