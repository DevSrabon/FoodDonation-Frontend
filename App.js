import { useFonts } from "expo-font";
import AuthProvider from "./src/context/Provider";
import BottomNav from "./src/navigation/BottomNav";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [loaded] = useFonts({
    Regular: require("./assets/fonts/Gilroy-Regular.ttf"),
    Medium: require("./assets/fonts/Gilroy-Medium.ttf"),
    SemiBold: require("./assets/fonts/Gilroy-SemiBold.ttf"),
    Bold: require("./assets/fonts/Gilroy-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="user"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Bottom" component={BottomNav}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
