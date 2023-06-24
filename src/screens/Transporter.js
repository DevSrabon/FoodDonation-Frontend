import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import { userContext } from "../context/Provider";
import useUpdateUser from "../hook/useUpdateSubRoleUser";

const Transporter = () => {
  const [update, setUpdate] = useState("");
  const { user } = userContext();
  const { loading, error, updateUserRole } = useUpdateUser();

  const onRoleSelect = async () => {
    updateUserRole(update, user?.email, "user");
  };

  if (error) return alert(error);

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text
          style={{ fontFamily: "SemiBold", fontSize: 20, color: "#B4AAF2" }}
        >
          Transporter,
        </Text>
        <Text style={{ fontFamily: "SemiBold", fontSize: 24 }}>
          Choose Your Role
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <Pressable
          style={styles.box}
          onPress={() => setUpdate("Non-Profit Organization")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Non-Profit Organization
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
        <Pressable style={styles.box} onPress={() => setUpdate("Food Banks")}>
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Food Banks
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
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

export default Transporter;
