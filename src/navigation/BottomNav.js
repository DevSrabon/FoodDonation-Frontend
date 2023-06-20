import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Search from "../screens/Search";
import WishList from "../screens/WishList";
import ProfileScreen from "../screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import StackNav from "./StackNav";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      backBehavior="Main"
      initialRouteName="Main"
      screenOptions={{
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#FF8682",
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
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="home"
              size={32}
              color={focused ? "#FF8682" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="search"
              size={32}
              color={focused ? "#FF8682" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishList}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="heart"
              size={32}
              color={focused ? "#FF8682" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="user"
              size={32}
              color={focused ? "#FF8682" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
