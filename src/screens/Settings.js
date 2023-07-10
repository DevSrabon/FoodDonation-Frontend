import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import icons from "../../assets/icons";
import Container from "../components/container";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { userContext } from "../context/Provider";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const { allData, user, loading, signOutUser } = userContext();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    if (user?.email) {
      await signOutUser();
    }
    navigation.navigate("login");
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Header>Settings</Header>
      <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ height: 40, width: 40, borderRadius: 50 }}
              source={icons.profile}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "SemiBold", fontSize: 18 }}>
                Sourav Paul
              </Text>
              <Text style={{ fontFamily: "Medium", fontSize: 14 }}>
                Restaurant Owner
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={handleSignOut}
          >
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{ fontFamily: "SemiBold", color: "#7A797C", marginTop: 10 }}
        >
          General
        </Text>
        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.user} />
          <Text style={styles.optionText}>Personal Profile</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.appearence} />
          <Text style={styles.optionText}>Appearance</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.ResProfile} />
          <Text style={styles.optionText}>Restaurant Profile</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.notifications} />
          <Text style={styles.optionText}>Notifications</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.previous} />
          <Text style={styles.optionText}>Previous Donates</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <Text
          style={{ fontFamily: "SemiBold", fontSize: 14, color: "#7A797C" }}
        >
          Stay in Touch
        </Text>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.contact} />
          <Text style={styles.optionText}>Contact Us</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.share} />
          <Text style={styles.optionText}>Share With Peers</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  optionText: {
    fontFamily: "Medium",
    color: "#000000",
    fontSize: 14,

    marginLeft: 10,
  },
});

export default Settings;
