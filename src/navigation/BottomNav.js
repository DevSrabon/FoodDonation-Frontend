import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import StackNav from "./StackNav";
import Home from "../screens/Home";
// import Donate from "../screens/Donate";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
// import DonorNext from "../screens/DonorNext";
import { userContext } from "../context/Provider";

import AddRestaurant from "../screens/AddRestaurant";
import DonateMeal from "../screens/DonateMeal";
import Donate from "../screens/Donate";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  const { user, signOutUser } = userContext();
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
        component={StackNav}
        options={{
          // headerShown: true,
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
        name="address"
        component={AddRestaurant}
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
      {/* <Tab.Screen
        name="home"
        component={AddRestaurant}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="home"
              size={32}
              color={focused ? "#B4AAF2" : "gray"}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="address"
        component={AddRestaurant}
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
      /> */}
      <Tab.Screen
        name="donate"
        component={Donate}
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
