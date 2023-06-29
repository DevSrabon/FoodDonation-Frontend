import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import axios from "axios";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";

const Donate = () => {
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

  const onDonate = async () => {
    setLoading(true);
    const body = {
      userName: name,
      postCategoryName: categoryName,
      email,
      location,
      role,
      caption,
      noOfItem,
    };
    try {
      const res = await axios.post(
        `https://food-donation-backend.vercel.app/api/v1/posts/createPost`,
        body
      );
      if (res.data.status === "success") {
        navigation.navigate("DonateMeal", {
          number: noOfItem,
          resData: res.data.data,
        });
      }
    } catch (error) {
      if (error.code === "This-Donor-already-in-use") {
        alert("The Donor is already in use");
      } else {
        console.log("Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const getAddressFromCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ`
      );

      const results = response.data.results;
      if (results.length > 0) {
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
    <ScrollView>
      <View style={styles.container}>
        <>
          {/* <Button 
                title="Back"
                onPress={() => {
                    navigation.goBack();
                }}
            /> */}
          <Text style={{ fontFamily: "SemiBold", fontSize: 30, bottom: 20 }}>
            Donate
          </Text>

          {/* Restaurant Name */}
          <View style={{ width: 310 }}>
            <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
              Restaurant Name
            </Text>

            <TextInput
              style={styles.disabledText}
              editable={false}
              placeholder={subRole}
            />
          </View>
          <View style={{ width: 310 }}>
            <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
              Location
            </Text>

            <TextInput
              style={styles.disabledText}
              editable={false}
              placeholder={address}
            />
          </View>

          {/* Image */}
          <View style={{ height: 120 }}>
            <View
              style={{
                height: 40,
                flexDirection: "row",
                marginRight: 20,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "SemiBold", fontSize: 20, top: 6 }}>
                Image
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add+</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 80,
                flexDirection: "row",
                gap: 5,
                marginRight: 20,
              }}
            >
              <Image style={styles.stretch} source={icons.fb} />
            </View>
          </View>

          {/* Caption */}
          <View style={{ width: 310 }}>
            <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
              Caption
            </Text>

            <TextInput
              style={styles.inputText}
              placeholder="Caption"
              value={caption}
              onChangeText={(text) => setCaption(text)}
            />
          </View>

          {/* No of items */}
          <View style={{ width: 310 }}>
            <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
              No of Items
            </Text>

            <TextInput
              style={styles.inputText}
              // editable={false}
              keyboardType="numeric"
              placeholder="No of Items"
              value={noOfItem}
              onChangeText={handleNumberChange}
            />
            <CustomButton text="Continue" onPress={onDonate} type="primary" />
          </View>
        </>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingTop: 60,
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

  button: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 150,
  },

  buttonText: {
    color: "gray",
    fontSize: 18,
    fontWeight: "bold",
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
  input: {
    height: 40,
    padding: 5,
  },
});

export default Donate;
