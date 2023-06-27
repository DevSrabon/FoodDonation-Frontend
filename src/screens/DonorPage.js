import { View, Text, Image } from "react-native";
import React from "react";
import Container from "../components/container";
import icons from "../../assets/icons";
import Measure from "../components/measure";
import CustomButton from "../components/CustomButton";

const DonorPage = () => {
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
        }}
      >
        <Text
          style={{
            //
            fontFamily: "SemiBold",
            fontSize: 18,
          }}
        >
          Cafe Bilhares
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Image source={icons.location} />
          <Text style={{ fontFamily: "SemiBold", fontSize: 10 }}>
            North landing Guide road. Rd. MGR Avenue, New Delhi 85486
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 7,
          }}
        >
          <Image source={icons.fixedHeight} />
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
              Orphanage
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
          <Measure />
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
          <Image source={icons.profile} />
          <View>
            <Text style={{ fontFamily: "SemiBold", fontSize: 16 }}>
              Sourav Paul
            </Text>
            <Text style={{ fontFamily: "Medium", fontSize: 12 }}>
              Restaurant owner
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", gap: 10, marginTop: 10 }}>
          <CustomButton text="Accept" onPress={onAccept} type="primary" />
          <CustomButton text="Decline" onPress={onDecline} type="primary" />
        </View>
      </View>
    </Container>
  );
};

export default DonorPage;
