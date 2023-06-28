import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import { userContext } from "../context/Provider";
import useUpdateUser from "../hook/useUpdateSubRoleUser";

const Donor = () => {
  const [update, setUpdate] = useState("");

  const { user } = userContext();
  const { loading, error, updateUserRole } = useUpdateUser();

  const onRoleSelect = async () => {
    updateUserRole(update, user?.email, "AddRestaurant");
  };

  if (error) return alert(error);

  if (loading) return <Loading />;
  return (
    <Container>
      <View style={styles.subContainer}>
        <Text
          style={{ fontFamily: "SemiBold", fontSize: 20, color: "#B4AAF2" }}
        >
          Donor,
        </Text>
        <Header> Choose Your Role</Header>
      </View>
      <View style={styles.boxContainer}>
        <Pressable
          style={styles.box}
          onPress={() => setUpdate("Restaurant Owner")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Restaurant Owner
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
        <Pressable
          style={styles.box}
          onPress={() => setUpdate("Catering Services")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Catering Services
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
        <Pressable
          style={styles.box}
          onPress={() => setUpdate("Grocery Store")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Grocery Store
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Grocery Store
          </Text>
        </Pressable>
        <Pressable
          style={styles.box}
          onPress={() => setUpdate("Normal People")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Normal People
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
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <CustomButton text="Continue" onPress={onRoleSelect} type="primary" />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    alignItems: "flex-start",
    paddingLeft: 20,
    marginBottom: 20,
    bottom: 60,
  },
  boxContainer: {
    alignItems: "center",
    bottom: 60,
  },
  box: {
    width: "90%",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 80,
    marginVertical: 5,
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#F5F6F7",
    borderColor: "#F5F6F7",
  },
});

export default Donor;
