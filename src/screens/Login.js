import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Container from "../components/container";
import Label from "../components/label";
import { userContext } from "../context/Provider";
import TextField from "../components/TextField";
const Login = () => {
  const {
    signIn,
    // promptAsync,
    user,
    // request,
    setAllData,
    loading,
    setLoading,
  } = userContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const [scaleValue] = useState(new Animated.Value(1));

  const navigation = useNavigation();
  const isFocus = useIsFocused();
  useEffect(() => {
    if (user?.email && isFocus) {
      navigation.navigate("background");
    }
  }, [user?.email, isFocus]);
  const onSignInPressed = async () => {
    try {
      const res = await signIn(email, password);
    } catch (error) {
      let errorMessage = "An error occurred during sign-in.";

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage =
          "Invalid email format. Please enter a valid email address.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many sign-in attempts. Please try again later.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
      } else {
        errorMessage = "An unknown error occurred. Please try again later.";
      }

      console.log(error);
      setError(errorMessage);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const animateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };

  const onGuestPressed = async () => {
    const res = await axios.get(
      "https://food-donation-backend.vercel.app/api/v1/users?email=guest@gmail.com"
    );
    if (res.status === 200) {
      setAllData((prev) => ({ ...prev, guestData: res.data.data.role }));
      navigation.navigate("home");
    }
  };

  const onSignup = () => {
    navigation.navigate("signup");
  };
  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container style={{ alignItems: "center" }}>
        <Header>Login</Header>

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

        {/* <Label>Password</Label> */}
        <TextField
          placeholder="Your Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginLeft: 18,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#B4AAF2" : undefined}
            />
            <Text
              style={{ fontFamily: "Medium", fontSize: 12, color: "#747980" }}
            >
              Remember me
            </Text>
          </View>

          {error && <CustomAlert type="error" value={error} />}

          <CustomButton
            text="Forgot Password"
            onPress={onForgotPasswordPressed}
            type="tertiary"
          />
        </View>

        <View style={{ flex: 1, width: "90%", bottom: 20 }}>
          <CustomButton
            text="Login"
            onPress={onSignInPressed}
            type="primary"
            loading={loading}
            disabled={loading}
          />
        </View>

        {/* <View style={styles.subContainer}>

          <Pressable
            style={styles.box}
            disabled={!request}
            onPress={() =>
              promptAsync({ useProxy: false, showInRecents: true })
            }
          >
            <Image source={icons.google} />
          </Pressable>
        </View> */}

        <View style={{ flex: 1, width: "90%", bottom: 60 }}>
          <CustomButton
            text="Signin as a Guest"
            onPress={onGuestPressed}
            type="primary"
          />
        </View>
        {/* <View style={{ alignItems: "center", width: "90%" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              animateButton(), onSignInPressed();
            }}
          >
            <Animated.View
              style={[styles.button, { transform: [{ scale: scaleValue }] }]}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View> */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontFamily: "SemiBold", fontSize: 12 }}>
            Don't have an account?
            <CustomButton text="Signup" onPress={onSignup} type="tertiary" />
          </Text>
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    alignSelf: "center",
    width: 72,
    heigh: 68,
    padding: 16,
    borderRadius: 6,
    borderColor: "#EBE9F1",
    borderWidth: 1,
  },
  checkbox: { marginRight: 3 },

  button: {
    backgroundColor: "#B4AAF2",
    elevation: 1,

    width: "90%",
    maxHeight: 50,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "white",
  },
});
export default Login;
