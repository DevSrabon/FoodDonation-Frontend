import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import Container from "../components/container";
import Measure from "../components/measure";
import { TouchableOpacity } from "react-native-web";
import CreateChat from "../components/CreateChat";
import Chat, { handleCreateUser } from "./Chat";
import ListenForChatAdd from "../components/ListenForChatAdd";

import { userContext } from "../context/Provider";
const DonorPage = () => {
  const route = useRoute();
  const { user } = route.params;
  const navigation = useNavigation();
  const [address, setAddress] = useState();
  const latitude = user.location.latitude;
  const longitude = user.location.longitude;
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
        setAddress("No Location found");
      }
    } catch (error) {
      console.warn("Error:", error);
    }
  };

  useEffect(() => {
    getAddressFromCoordinates();
  }, [latitude, longitude]);

  const onAccept = () => {
    
    console.warn("Accept");
    <ListenForChatAdd/>
   //create a chat for needy 
//Sender should listen for reciver accpt if true then sender should have a chat open using a room id
  }
    navigation.navigate("map", { routesMapData: user });
  };
  const onDecline = () => {
    console.warn("AccDeclineept");
  };

  return (
    <Container key={user?._id}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignSelf: "center",
          width: "90%",
        }}
      >
        <Text
          style={{
            //
            fontFamily: "SemiBold",
            fontSize: 18,
          }}
        >
          {user?.categoryName || user?.postCategoryName}
          {/* Cafe Bilhares */}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Image source={icons.location} />
          <Text style={{ fontFamily: "SemiBold", fontSize: 10 }}>
            {address}
            {/* Rewa boda bag mp */}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 7,
          }}
        >
          <Image
            source={{ uri: user?.image?.[0] || user?.imageUrls?.[0] }}
            // source={require("../../assets/icons/fixedHeight.png")}
            style={{ width: "100%", height: 180, resizeMode: "stretch" }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
          <View
            style={{
              backgroundColor: "#F4A099",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontFamily: "Medium", fontSize: 10 }}>
              {user?.subRole || user?.role}
              {/* donar */}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#F5F6F7",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontFamily: "Medium", fontSize: 10 }}>2.2kms</Text>
          </View>
          <View
            style={{
              backgroundColor: "#F5F6F7",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontFamily: "Medium", fontSize: 10 }}>
              5 Delivery
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              gap: 5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                borderColor: "red",
                borderRadius: 10,
                borderWidth: 1,
                padding: 7,
              }}
            >
              <Text>4.2</Text>
            </View>
            <View>
              <Text style={{ fontFamily: "Medium", fontSize: 7 }}>
                Very Good 54 reviews
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Measure email={user?.email} />
          {/* user.email */}
        </View>

        {/* <View
          style={{
            width: "100%",
            height: 128,
            backgroundColor: "#efedf8",
            borderRadius: 5,
            borderColor: "#b4aaf2",
            borderWidth: 1,
            marginVertical: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Food Availability
          </Text>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            // marginVertical: 10,
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <Image
            source={
              {
                uri: user?.photo,
              } || icons.profile
            }
            // source={require("../../assets/icons/profile.png")}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <View>
            <Text style={{ fontFamily: "SemiBold", fontSize: 16 }}>
              {user?.userName || user?.name}
              {/* Sourav Paul */}
            </Text>
            <Text style={{ fontFamily: "Medium", fontSize: 12 }}>
              {user?.role}
              {/* Restaurent owner */}
            </Text>
          </View>
        </View>
        {/* user?.role === "donor" */}

        <View style={{ flex: 1, alignItems: "center", gap: 10, marginTop: 10 }}>
          <CustomButton onPress={onAccept} text="Accept" type="primary" />
          <CustomButton onPress={onDecline} text="Decline" type="primary" />
        </View>
      </View>
    </Container>
  );


export default DonorPage;
