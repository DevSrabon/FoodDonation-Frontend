import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Home from "./src/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Intro from "./src/screens/Intro";
import Login from "./src/screens/Login";
import InitialPage from "./src/screens/InitialPage";
import Signup from "./src/screens/Signup";
import Otp from "./src/screens/Otp";
// import BottomNav from "./src/navigation/BottomNav";

export default function App() {
  const [loaded] = useFonts({
    Reguler: require("./assets/fonts/Gilroy-Regular.ttf"),
    Medium: require("./assets/fonts/Gilroy-Medium.ttf"),
    SemiBold: require("./assets/fonts/Gilroy-SemiBold.ttf"),
    Bold: require("./assets/fonts/Gilroy-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="initial"
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="Bottom" component={BottomNav}></Stack.Screen> */}
        <Stack.Screen name="initial" component={InitialPage}></Stack.Screen>
        <Stack.Screen name="intro" component={Intro}></Stack.Screen>
        <Stack.Screen name="login" component={Login}></Stack.Screen>
        <Stack.Screen name="signup" component={Signup}></Stack.Screen>
        <Stack.Screen name="otp" component={Otp}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
