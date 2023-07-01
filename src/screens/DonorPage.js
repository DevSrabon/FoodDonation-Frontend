import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import Container from "../components/container";
import Measure from "../components/measure";

const DonorPage = () => {
  const route = useRoute();
  const { user } = route.params;
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
        setAddress("No results found");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getAddressFromCoordinates();
  }, [latitude, longitude]);

  const onAccept = () => {
    console.warn("Accept");
  };
  const onDecline = () => {
    console.warn("AccDeclineept");
  };

  return (
    <Container>
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
          {user?.categoryName}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Image source={icons.location} />
          <Text style={{ fontFamily: "SemiBold", fontSize: 10 }}>
            {address}
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
            source={{ uri: user?.image?.[0] }}
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
              {user?.subRole}
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
          <Measure email={user.email} />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            // marginVertical: 10,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Image
            source={{ uri: user?.photo }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <View>
            <Text style={{ fontFamily: "SemiBold", fontSize: 16 }}>
              {user?.name}
            </Text>
            <Text style={{ fontFamily: "Medium", fontSize: 12 }}>
              {user?.role}
            </Text>
          </View>
        </View>
        {user?.role === "donor" && (
          <View style={{ alignItems: "center", gap: 10, marginTop: 10 }}>
            <CustomButton text="Accept" onPress={onAccept} type="primary" />
            <CustomButton text="Decline" onPress={onDecline} type="primary" />
          </View>
        )}
      </View>
    </Container>
  );
};

export default DonorPage;
