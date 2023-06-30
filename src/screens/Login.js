import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import Label from "../components/label";
import { userContext } from "../context/Provider";
import useToken from "../hook/useToken";

const Login = () => {
  const { signIn, promptAsync, user, request, loading, setLoading } =
    userContext();
  const [userEmail, setUserEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [token] = useToken(userEmail);
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.navigate("user");
    }
  }, [token, navigation]);
  // useEffect(() => {
  //   if (token) {
  //     navigation.navigate(
  //       allData?.userData?.role == "needy" ? "user" : "donornext"
  //     );
  //   }
  // }, [token, navigation, allData?.userData?.role]);
  const onSignInPressed = async () => {
    try {
      const res = await signIn(email, password);
      setUserEmail(email);
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };

  const onSignInFacebook = () => {
    console.warn("Facebook");
  };

  const onSignInGoogle = () => {
    console.warn("Google");
  };

  const onSignInLinkedin = () => {
    console.warn("linkedin");
  };

  const onSignup = () => {
    navigation.navigate("signup");
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container>
        <Header>Login</Header>

        <Label>E-mail</Label>
        <CustomInput
          placeholder="Your Email"
          value={email}
          setValue={setEmail}
        />

        <Label>Password</Label>
        <CustomInput
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

          <CustomButton
            text="Forgot Password"
            onPress={onForgotPasswordPressed}
            type="tertiary"
          />
        </View>

        <View style={{ flex: 1, width: "90%" }}>
          {/* bottom: 20 */}
          <CustomButton text="Login" onPress={onSignInPressed} type="primary" />
        </View>
        <View style={{ flex: 1, bottom: 20 }}>
          <Text
            style={{
              fontFamily: "SemiBold",
              fontSize: 14,
              justifyContent: "center",
              marginLeft: 75,
            }}
          >
            or continue with
          </Text>

          <View style={styles.subContainer}>
            <Pressable style={styles.box}>
              <Image source={icons.fb} />
            </Pressable>
            <Pressable
              style={styles.box}
              disabled={!request}
              onPress={() =>
                promptAsync({ useProxy: false, showInRecents: true })
              }
            >
              <Image source={icons.google} />
            </Pressable>
            <Pressable style={styles.box}>
              <Image source={icons.linked} />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontFamily: "SemiBold", fontSize: 12 }}>
            Don,t have an account?
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
    flexDirection: "row",

    gap: 20,
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
});
export default Login;
