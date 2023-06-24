import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AddRestaurant = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const navigation = useNavigation();

  const [RestaurantName, setRestaurantName] = useState("");
  const [Location, setLocation] = useState("");
  const [FSSAILicense, setFSSAILicense] = useState("");
  const [PanNumber, setPanNumber] = useState("");

  const onAddRestaurant = async () => {
    navigation.navigate("DonateMeal");
    const RestaurantName = { displayName: RestaurantName };
    try {
      await setLoading(false);
    } catch (error) {
      if (error.code === "This-restaurant-already-in-use") {
        alert("The Restaurant is already in use");
        setLoading(false);
      } else {
        console.log("Error:", error);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  const onPressAddress = (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;

    console.log("Latitude:", lat);
    console.log("Longitude:", lng);
  };

  return (
    <View style={styles.container}>
      {/* <Button
                title="Back"
                onPress={() => {
                    navigation.goBack();
                }}
            /> */}
      <Text style={{ fontFamily: "Bold", fontSize: 30, bottom: 10 }}>
        Add Restaurant
      </Text>
      <Text style={{ fontFamily: "Bold", fontSize: 14, top: 6 }}>
        Restaurant Name
      </Text>
      <CustomInput
        placeholder="Restaurant Name"
        value={RestaurantName}
        setValue={setRestaurantName}
      />
      {/* Image add part */}
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
          style={{ height: 80, flexDirection: "row", gap: 5, marginRight: 20 }}
        >
          <Image style={styles.stretch} source={icons.google} />
          <Image style={styles.stretch} source={icons.google} />
          <Image style={styles.stretch} source={icons.google} />
          <Image style={styles.stretch} source={icons.google} />
        </View>
      </View>

      {/* Location */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>Location</Text>

        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="search"
          onPress={onPressAddress}
          query={{
            key: "AIzaSyDnSNNGQQ8AhLEmcsXJbmz1_MVrbOz55rM",
            language: "en",
          }}
        />
      </View>

      {/* FSSAI License */}
      {/* <View>
        <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
          FSSAI License
        </Text>

        <CustomInput
          placeholder="FSSAI License"
          value={FSSAILicense}
          setValue={setFSSAILicense}
        />
      </View> */}

      {/* PAN number */}
      {/* <View>
        <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>PAN number</Text>
        <CustomInput
          placeholder="PAN Number"
          value={PanNumber}
          setValue={setPanNumber}
          secureTextEntry={true}
        />
      </View> */}

      <CustomButton text="Continue" onPress={onAddRestaurant} type="primary" />
    </View>
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
});

export default AddRestaurant;
