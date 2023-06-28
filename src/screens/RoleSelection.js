import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import { userContext } from "../context/Provider";

const RoleSelection = () => {
  const navigation = useNavigation();
  const [update, setUpdate] = useState("");
  const { user } = userContext();
  const [loading, setLoading] = useState(false);

  const onRoleSelect = async () => {
    setLoading(true);
    const body = { email: user.email, role: update };
    try {
      const response = await fetch(
        "https://food-donation-backend.vercel.app/api/v1/users/update-role",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === "success") {
          return navigation.navigate(responseData.data.role.toString());
        }
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      alert("Error updating user: " + error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <Container>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          alignSelf: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 20,
            color: "#B4AAF2",
          }}
        >
          Welcome,
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "flex-start",
          justifyContent: "flex-start",
          bottom: 100,
        }}
      >
        <Header>Choose Your Role</Header>
      </View>

      <View style={styles.boxContainer}>
        <Pressable style={styles.box} onPress={() => setUpdate("donor")}>
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Donor
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who donates the food
          </Text>
        </Pressable>
        <Pressable style={styles.box} onPress={() => setUpdate("transporter")}>
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Transporter
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who helps Transporting the food
          </Text>
        </Pressable>
        <Pressable style={styles.box} onPress={() => setUpdate("needy")}>
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Food Needier
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who needs the food
          </Text>
        </Pressable>
      </View>
      <View
        style={{ flex: 3, width: "90%", alignItems: "center", marginTop: 20 }}
      >
        <CustomButton text="Continue" onPress={onRoleSelect} type="primary" />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  box: {
    width: 340,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 20,
    marginVertical: 5,
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#F5F6F7",
    borderColor: "#F5F6F7",
  },
});
export default RoleSelection;
