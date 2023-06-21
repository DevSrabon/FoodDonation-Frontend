import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";

const Otp = () => {
  const onVerify = () => {
    console.warn("otp");
  };
  const onResend = () => {
    console.warn("otp");
  };
  return (
    <View style={styles.container}>
      <Text
        style={{ fontFamily: "SemiBold", fontSize: 28, right: 70, bottom: 150 }}
      >
        Check your Phone
      </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
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
