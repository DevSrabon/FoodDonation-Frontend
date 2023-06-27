import { Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screens/Home";
// import Donate from "../screens/Donate";
import Chat from "../screens/Chat";
import Donor from "../screens/Donor";
import User from "../screens/User";
import DonorPage from "../screens/DonorPage";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
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
        name="user"
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
        name="donorPage"
        component={DonorPage}
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

export default BottomNav;
