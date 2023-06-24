import { Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { userContext } from "../context/Provider";
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
import User from "../screens/User";
import Transporter from "../screens/Transporter";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior="Main"
      initialRouteName="Main"
      screenOptions={{
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#B4AAF2",
        tabBarStyle: {
          position: "absolute",
          borderRadius: 20,
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 1,
          backgroundColor: "white",
          height: 70,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Main"
        component={User}
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="user"
              size={32}
              color={focused ? "#B4AAF2" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="home"
              size={32}
              color={focused ? "#B4AAF2" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="donornext"
        component={Donor}
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="user-plus"
              size={32}
              color={focused ? "#B4AAF2" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="md-chatbox-ellipses-outline"
              size={32}
              color={focused ? "#B4AAF2" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNav = () => {
  const { user, signOutUser } = userContext();

  useEffect(() => {
    if (user?.email) return signOutUser;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="initial"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="initial" component={InitialPage} />
        <Stack.Screen name="intro" component={Intro} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="otp" component={Otp} />
        <Stack.Screen name="roleSelection" component={RoleSelection} />
        <Stack.Screen name="needy" component={FoodNeedier} />
        <Stack.Screen name="transporter" component={Transporter} />
        <Stack.Screen name="donor" component={Donor} />
        <Stack.Screen name="user">
          {() => (
            <Stack.Navigator
              initialRouteName="User"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="User" component={UserTabNavigator} />
            </Stack.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
