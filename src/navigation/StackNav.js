import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import icons from "../../assets/icons";
import { Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InitialPage from "../screens/InitialPage";
import Intro from "../screens/Intro";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Otp from "../screens/Otp";
import Donor from "../screens/Donor";
import Transporter from "../screens/Transporter";
import FoodNeedier from "../screens/FoodNeedier";
import User from "../screens/User";
import Chat from "../screens/Chat";
import Home from "../screens/Home";
import RoleSelection from "../screens/RoleSelection";
import Profile from "../screens/Profile";
import DonorNext from "../screens/DonorNext";
import { userContext } from "../context/Provider";
import UserCountWithinRadius from "../screens/UserCountWithinRadius";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const navigation = useNavigation();
  const { user, signOutUser } = userContext();

  // SignOut While reload. ** We will remove it later.
  useEffect(() => {
    if (user?.email) return signOutUser;
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={user?.email ? "user" : "initial"}
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
      }}
    >
      {/* <Stack.Screen name="initial" component={InitialPage}></Stack.Screen> */}
      <Stack.Screen name="initial" component={UserCountWithinRadius}></Stack.Screen>
      <Stack.Screen name="intro" component={Intro}></Stack.Screen>
      <Stack.Screen name="login" component={Login}></Stack.Screen>
      <Stack.Screen name="signup" component={Signup}></Stack.Screen>
      <Stack.Screen name="otp" component={Otp}></Stack.Screen>
      <Stack.Screen
        name="roleSelection"
        component={RoleSelection}
      ></Stack.Screen>
      <Stack.Screen name="donor" component={Donor}></Stack.Screen>
      <Stack.Screen name="transporter" component={Transporter}></Stack.Screen>
      <Stack.Screen name="foodNeedier" component={FoodNeedier}></Stack.Screen>
      <Stack.Screen
        name="user"
        component={User}
        // options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="chat" component={Chat}></Stack.Screen>
      <Stack.Screen name="home" component={Home}></Stack.Screen>
      <Stack.Screen name="profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="donornext" component={DonorNext}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNav;
