import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/container";
import Header from "../components/Header";

const Otp = () => {
  const navigation = useNavigation();
  const onVerify = () => {
    navigation.navigate("roleSelection");
  };
  const onResend = () => {
    console.warn("otp");
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container>
        <Header>Check your Phone</Header>
        <View
          style={{
            flex: 1,
            alignSelf: "center",
            justifyContent: "flex-start",
            bottom: 40,
          }}
        >
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 14,
              paddingHorizontal: 10,
            }}
          >
            We,ve sent a 6-digit confirmation code to{" "}
            <Text style={{ fontFamily: "Bold" }}>+91 98765 *****.</Text> Make
            sure you enter correct code.
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: "row", width: "90%", gap: 8 }}>
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
        </View>
        <View style={{ flex: 2, width: "90%" }}>
          <CustomButton text="Verify" onPress={onVerify} type="primary" />
        </View>

        <View style={{ flex: 3, width: "90%" }}>
          <Text
            style={{
              fontFamily: "SemiBold",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            Didn’t recieve code?
            <CustomButton
              text="Resend Code"
              onPress={onResend}
              type="tertiary"
            />
          </Text>
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: "13%",
    maxHeight: 60,
    borderColor: "#A2A2A6",
    borderWidth: 1,
    borderRadius: 7,
    // marginVertical: 10,
  },
});

export default Otp;
