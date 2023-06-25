import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import AuthProvider from "./src/context/Provider";
import StackNav from "./src/navigation/StackNav";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

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
      <StackNav />
      <ExpoStatusBar style="auto" />
    </AuthProvider>
  );
}
