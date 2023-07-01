import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Chat from "../screens/Chat";
import Donor from "../screens/Donor";
import FoodNeedier from "../screens/FoodNeedier";
import Home from "../screens/Home";
import InitialPage from "../screens/InitialPage";
import Intro from "../screens/Intro";
import Login from "../screens/Login";
import Otp from "../screens/Otp";
import RoleSelection from "../screens/RoleSelection";

import AddRestaurant from "../screens/AddRestaurant";
import Donate from "../screens/Donate";
import DonateMeal from "../screens/DonateMeal";
import Help from "../screens/Help";
import HelpMeal from "../screens/HelpMeal";
import Profile from "../screens/Profile";

import MapModal from "../components/MapModal";
import DonorPage from "../screens/DonorPage";
import Signup from "../screens/Signup";
import Transporter from "../screens/Transporter";
import BottomNav from "./BottomNav";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="user"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="initial" component={InitialPage} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="intro" component={Intro} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="otp" component={Otp} />
        <Stack.Screen name="roleSelection" component={RoleSelection} />
        <Stack.Screen name="needy" component={FoodNeedier} />
        <Stack.Screen name="transporter" component={Transporter} />
        <Stack.Screen name="donor" component={Donor} />
        <Stack.Screen name="donorPage" component={DonorPage} />
        <Stack.Screen name="addRestaurant" component={AddRestaurant} />
        <Stack.Screen name="DonateMeal" component={DonateMeal} />
        <Stack.Screen name="donate" component={Donate} />
        <Stack.Screen name="help" component={Help} />
        <Stack.Screen name="helpMeal" component={HelpMeal} />
        <Stack.Screen name="mapModal" component={MapModal} />
        {/* <Stack.Screen name="profile" component={Profile} /> */}
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="user">
          {() => (
            <Stack.Navigator
              initialRouteName="User"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="User" component={BottomNav} />
            </Stack.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
