import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import AuthProvider from "./src/context/Provider";
// import Donor from "./src/screens/Donor";
// import FoodNeedier from "./src/screens/FoodNeedier";
// import InitialPage from "./src/screens/InitialPage";
// import Intro from "./src/screens/Intro";
// import Login from "./src/screens/Login";
// import Otp from "./src/screens/Otp";
// import RoleSelection from "./src/screens/RoleSelection";
// import Signup from "./src/screens/Signup";
// import Transporter from "./src/screens/Transporter";
// import User from "./src/screens/User";
// import Chat from "./src/screens/Chat";
// import Home from "./src/screens/Home";
import BottomNav from "./src/navigation/BottomNav";

export default function App() {
  const [loaded] = useFonts({
    Regular: require("./assets/fonts/Gilroy-Regular.ttf"),
    Medium: require("./assets/fonts/Gilroy-Medium.ttf"),
    SemiBold: require("./assets/fonts/Gilroy-SemiBold.ttf"),
    Bold: require("./assets/fonts/Gilroy-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="user"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Bottom" component={BottomNav}></Stack.Screen>
          {/* <Stack.Screen name="initial" component={InitialPage}></Stack.Screen>
          <Stack.Screen name="intro" component={Intro}></Stack.Screen>
          <Stack.Screen name="login" component={Login}></Stack.Screen>
          <Stack.Screen name="signup" component={Signup}></Stack.Screen>
          <Stack.Screen name="otp" component={Otp}></Stack.Screen>
          <Stack.Screen
            name="roleSelection"
            component={RoleSelection}
          ></Stack.Screen>
          <Stack.Screen name="donor" component={Donor}></Stack.Screen>
          <Stack.Screen
            name="transporter"
            component={Transporter}
          ></Stack.Screen>
          <Stack.Screen
            name="foodNeedier"
            component={FoodNeedier}
          ></Stack.Screen>
          <Stack.Screen name="user" component={User}></Stack.Screen>
          <Stack.Screen name="chat" component={Chat}></Stack.Screen>
          <Stack.Screen name="home" component={Home}></Stack.Screen> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
