import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Container from "../components/container";
import Label from "../components/label";
import { userContext } from "../context/Provider";
import TextField from "../components/TextField";
const Signup = () => {
  const { createUser, updateUser, user, promptAsync, loading, setLoading } =
    userContext();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onSignup = async () => {
    const userName = { displayName: firstName + " " + lastName };
    setLoading(true);
    try {
      await createUser(email, password);
      await updateUser(userName);
      const res = await axios.post(
        "https://food-donation-backend.vercel.app/api/v1/users/create",
        {
          name: userName.displayName,
          email,
          isAdmin: false,
          phone: phoneNumber,
        }
      );
      if (res.status === 201) return navigation.navigate("roleSelection");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        const errorMessage = error.response.data.error;
        const emailTakenMessage = "Email is already taken";
        if (errorMessage.includes(emailTakenMessage)) {
          setError(emailTakenMessage);
        }
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  const onLogin = () => {
    navigation.navigate("login");
  };
  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container style={{ alignItems: "center" }}>
        <Header>Signup</Header>

        {/* <Label>First Name</Label>
        <CustomInput
          placeholder="Your First Name"
          value={firstName}
          setValue={setFirstName}
        /> */}
        
        <TextField
          placeholder="Your First Name"
          value={firstName}
          setValue={setFirstName}
        />

        {/* <Label>Last Name</Label>
        <CustomInput
          placeholder="Your Last Name"
          value={lastName}
          setValue={setLastName}
        /> */}
      
        <TextField
          placeholder="Your Last Name"
          value={lastName}
          setValue={setLastName}
        />

        {/* <Label>Phone Number</Label>
        <CustomInput
          placeholder="Your Phone Number"
          value={phoneNumber}
          setValue={setPhoneNumber}
          keyboardType={"phone-pad"}
        /> */}
        
       
        <TextField
          placeholder="Your Phone Number"
          value={phoneNumber}
          setValue={setPhoneNumber}
          keyboardType={"phone-pad"}
        />

        {/* <Label>E-mail</Label>
        <CustomInput
          placeholder="Your Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        /> */}

       
        <TextField
          placeholder="Your Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        />

        {/* <Label>Password</Label>
        <CustomInput
          placeholder="Your Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        /> */}
        
        <TextField
          placeholder="Your Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <View>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 10,
              marginHorizontal: 10,
            }}
          >
            By signing up you agree to our{" "}
            <Text style={{ fontSize: 16 }}>Terms & Conditions</Text> and{" "}
            <Text style={{ fontSize: 16 }}>Privacy Policy.*</Text>
          </Text>
        </View>

        <View style={{ flex: 1, width: "90%" }}>
          <CustomButton
            text="Continue"
            loading={loading}
            disabled={loading}
            onPress={onSignup}
            type="primary"
          />
        </View>
        <View
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          {error && <CustomAlert type="error" value={error} />}

          <Text
            style={{
              fontFamily: "SemiBold",
              fontSize: 12,
              textAlign: "center",
              bottom: 20,
            }}
          >
            Already signed up ?
            <CustomButton text="Login" onPress={onLogin} type="tertiary" />
          </Text>
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Signup;
