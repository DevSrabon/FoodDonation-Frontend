import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import icons from "../../assets/icons";

import { Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InitialPage from "../screens/InitialPage";
import Intro from "../screens/Intro";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Otp from "../screens/Otp";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="initial"
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTitleAlign: "center",
        headerTintColor: "black",
        // statusBarStyle: "auto",

        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={icons.leftArrow} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate("Settings")}>
            <Image source={icons.setting} />
          </Pressable>
        ),
      }}
    >
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen name="initial" component={InitialPage} />
      <Stack.Screen
        name="intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="otp"
        component={Otp}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Single"
        component={SingleRoute}
        options={({ route }) => ({ title: route.params.name })}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNav;
