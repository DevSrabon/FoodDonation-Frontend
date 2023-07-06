
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";
import Meal from "../components/Meal";
// import { Picker } from "@react-native-picker/picker";
// import { useRoute } from "@react-navigation/native";
// import axios from "axios";
// import CustomButton from "../components/CustomButton";
// import CustomInput from "../components/CustomInput";
// import Container from "../components/container";

const DonateMeal = ({routeName="Donate"}) => {
  const { loading, setLoading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <Meal routeName={routeName}/>
    </ScrollView>
  );
};


export default DonateMeal;
