import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/container";

const Otp = () => {
  const navigation = useNavigation();
  const onVerify = () => {
    navigation.navigate("roleSelection");
  };
  const onResend = () => {
    console.warn("otp");
  };
  return (
    <Container>
      <Header>Check your Phone</Header>
      <Text
        style={{
          fontFamily: "Medium",
          fontSize: 14,
          paddingHorizontal: 10,
          bottom: 150,
        }}
      >
        We,ve sent a 6-digit confirmation code to{" "}
        <Text style={{ fontFamily: "Bold" }}>+91 98765 *****.</Text> Make sure
        you enter correct code.
      </Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 50 }}>
        <TextInput style={styles.input} />
        <TextInput style={styles.input} />
        <TextInput style={styles.input} />
        <TextInput style={styles.input} />
        <TextInput style={styles.input} />
        <TextInput style={styles.input} />
      </View>
      <CustomButton text="Verify" onPress={onVerify} type="primary" />
      <Text
        style={{
          fontFamily: "SemiBold",
          fontSize: 12,
          textAlign: "center",
          top: 150,
        }}
      >
        Already signed up ?
        <CustomButton text="Resend Code" onPress={onResend} type="tertiary" />
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "13%",

    borderColor: "#A2A2A6",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
});

export default Otp;
