import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";
import Container from "../components/container";

const Donate = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const navigation = useNavigation();

  const [Caption, setCaption] = useState("");
  const [number, setNumber] = useState("");

  const handleNumberChange = (value) => {
    // Remove non-numeric characters
    const formattedValue = value.replace(/[^0-9]/g, "");
    setNumber(formattedValue);
  };

  const onDonate = async () => {
    navigation.navigate("DonateMeal");
    const DonorName = { displayName: DonorName };
    try {
      await setLoading(false);
    } catch (error) {
      if (error.code === "This-Donor-already-in-use") {
        alert("The Donor is already in use");
        setLoading(false);
      } else {
        console.log("Error:", error);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <>
        {/* <Button 
                title="Back"
                onPress={() => {
                    navigation.goBack();
                }}
            /> */}
        <Text style={{ fontFamily: "SemiBold", fontSize: 30, bottom: 20 }}>
          Donate
        </Text>

        {/* Restaurant Name */}
        <View style={{ width: 310 }}>
          <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
            Restaurant Name
          </Text>

          <TextInput
            style={styles.disabledText}
            editable={false}
            placeholder="New Restaurant,Delhi"
          />
        </View>
        <View style={{ width: 310 }}>
          <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>Location</Text>

          <TextInput
            style={styles.disabledText}
            editable={false}
            placeholder="New delhi"
          />
        </View>

        {/* Image */}
        <View style={{ height: 120 }}>
          <View
            style={{
              height: 40,
              flexDirection: "row",
              marginRight: 20,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontFamily: "SemiBold", fontSize: 20, top: 6 }}>
              Image
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add+</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 80,
              flexDirection: "row",
              gap: 5,
              marginRight: 20,
            }}
          >
            <Image style={styles.stretch} source={icons.fb} />
          </View>
        </View>

        {/* Caption */}
        <View style={{ width: 310 }}>
          <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>Caption</Text>

          <TextInput
            style={styles.inputText}
            placeholder="Caption"
            value={Caption}
          />
        </View>

        {/* No of items */}
        <View style={{ width: 310 }}>
          <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
            No of Items
          </Text>

          <TextInput
            style={styles.inputText}
            // editable={false}
            keyboardType="numeric"
            placeholder="No of Items"
            value={number}
            onChangeText={handleNumberChange}
          />
        </View>
        <CustomButton text="Continue" onPress={onDonate} type="primary" />
      </>
    </Container>
  );
};

const styles = StyleSheet.create({
  stretch: {
    width: 60,
    height: 60,
    resizeMode: "stretch",
    backgroundColor: "black",
    borderRadius: 8,
  },

  button: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 150,
  },

  buttonText: {
    color: "gray",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledText: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 40,
    backgroundColor: "#f2f2f2",
  },
  inputText: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 40,
  },
  input: {
    height: 40,
    padding: 5,
  },
});

export default Donate;
