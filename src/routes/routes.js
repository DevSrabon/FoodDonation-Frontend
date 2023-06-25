import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { userContext } from "../context/Provider";
import BottomNav from "../navigation/BottomNav";
import Chat from "../screens/Chat";
import Donor from "../screens/Donor";
import FoodNeedier from "../screens/FoodNeedier";
import Home from "../screens/Home";
import InitialPage from "../screens/InitialPage";
import Intro from "../screens/Intro";
import Login from "../screens/Login";
import Otp from "../screens/Otp";
import RoleSelection from "../screens/RoleSelection";
import Signup from "../screens/Signup";
import Transporter from "../screens/Transporter";
import User from "../screens/User";

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const { user, signOutUser } = userContext();

  // SignOut While reload. ** We will remove it later.
  // useEffect(() => {
  //   if (user?.email) return signOutUser;
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user?.email ? "user" : "initial"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Bottom" component={BottomNav}></Stack.Screen>
        <Stack.Screen name="initial" component={InitialPage}></Stack.Screen>
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
        <Stack.Screen name="needy" component={FoodNeedier}></Stack.Screen>
        <Stack.Screen name="user" component={User}></Stack.Screen>
        <Stack.Screen name="chat" component={Chat}></Stack.Screen>
        <Stack.Screen name="home" component={Home}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
