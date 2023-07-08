import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import icons from "../../assets/icons";
import Container from "../components/container";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Settings = () => {
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

          <Pressable style={{ alignItems: "center" }} onPress={() => {}}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text>Logout</Text>
          </Pressable>
        </View>
        <Text
          style={{ fontFamily: "SemiBold", color: "#7A797C", marginTop: 10 }}
        >
          General
        </Text>
        <Pressable style={styles.optionRow}>
          <Image source={icons.user} />
          <Text style={styles.optionText}>Personal Profile</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>

        <Pressable style={styles.optionRow}>
          <Image source={icons.appearence} />
          <Text style={styles.optionText}>Appearance</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>

        <Pressable style={styles.optionRow}>
          <Image source={icons.ResProfile} />
          <Text style={styles.optionText}>Restaurant Profile</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>

        <Pressable style={styles.optionRow}>
          <Image source={icons.notifications} />
          <Text style={styles.optionText}>Notifications</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>

        <Pressable style={styles.optionRow}>
          <Image source={icons.previous} />
          <Text style={styles.optionText}>Previous Donates</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>

        <Text
          style={{ fontFamily: "SemiBold", fontSize: 14, color: "#7A797C" }}
        >
          Stay in Touch
        </Text>

        <Pressable style={styles.optionRow}>
          <Image source={icons.contact} />
          <Text style={styles.optionText}>Contact Us</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>

        <Pressable style={styles.optionRow}>
          <Image source={icons.share} />
          <Text style={styles.optionText}>Share With Peers</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>
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
