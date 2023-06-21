import { useNavigation } from "@react-navigation/native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import React, { useContext, useEffect, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/Provider";

const Signup = () => {
  const navigation = useNavigation();
  const { createUser, updateUser, promptAsync, loading, setLoading } =
    useContext(AuthContext);
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    verificationCode: "",
    verificationId: "",
  });
  const { email, password, firstName, lastName, phoneNumber } = inputField;
  const userName = { displayName: firstName + " " + lastName };

  // const [error, setError] = useState("");

  // const [flag, setFlag] = useState(false);
  // const [otp, setOtp] = useState("");
  // const [result, setResult] = useState("");
  // const getOtp = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   const { phoneNumber } = inputField; //
  //   if (!phoneNumber) {
  //     setError("Please enter a valid phone number!");
  //     return;
  //   }
  //   try {
  //     const response = await setUpRecaptha(phoneNumber);
  //     console.log(phoneNumber);
  //     setResult(response);
  //     setFlag(true);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const verifyOtp = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   if (otp === "" || otp === null) return;
  //   try {
  //     await result.confirm(otp);
  //     navigation.navigate("/home");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  const handleSignUp = async () => {
    try {
      await createUser(email, password);
      await updateUser(userName);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use");
      } else {
        console.log("Error:", error);
      }
    }
  };
  const handleChangeText = (key, value) => {
    setInputField((prevInputField) => ({
      ...prevInputField,
      [key]: value,
    }));
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 10,
      }}
    >
      <Text>Signup</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 5,
        }}
      >
        <Text>Email</Text>
        <TextInput
          value={inputField.email}
          onChangeText={(text) => handleChangeText("email", text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text>Password</Text>
        <TextInput
          value={inputField.password}
          onChangeText={(text) => handleChangeText("password", text)}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Text>Phone Number</Text>
        <TextInput
          value={inputField.phoneNumber}
          onChangeText={(text) => handleChangeText("phoneNumber", text)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text>First Name</Text>
        <TextInput
          value={inputField.firstName}
          onChangeText={(text) => handleChangeText("firstName", text)}
          placeholder="Enter your first name"
        />

        <Text>Last Name</Text>
        <TextInput
          value={inputField.lastName}
          onChangeText={(text) => handleChangeText("lastName", text)}
          placeholder="Enter your last name"
        />
        {/* <Text id="recaptcha-container"></Text> */}
        <Button title="Send Verification Code" onPress={handleSignUp} />
        <FontAwesome.Button
          name="google"
          backgroundColor="#3b5998"
          onPress={() => promptAsync({ useProxy: false, showInRecents: true })}
        >
          Login with google
        </FontAwesome.Button>
      </View>
      <Pressable onPress={() => navigation.navigate("otp")}>
        <Text>OTP</Text>
      </Pressable>
    </View>
  );
};

export default Signup;
