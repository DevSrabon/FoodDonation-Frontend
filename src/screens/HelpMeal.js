import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";

const DonateMeal = () => {
  const route = useRoute();
  const numbers = route.params.number;
  const resData = route.params.resData;

  const [listItems, setListItems] = useState([]);

  const mealOptions = [
    { id: 1, label: "Vegetarian" },
    { id: 2, label: "Non-Vegetarian" },
    // { id: 3, label: "Meal3" },
  ];

  React.useEffect(() => {
    const items = [];
    for (let i = 1; i <= numbers; i++) {
      items.push({
        id: i,
        value: "",
        qType: "",
        quantityType: "",
        quantity: "",
      });
    }
    setListItems(items);
  }, [numbers]);

  const handleValueChange = (text, index, property) => {
    const updatedItems = [...listItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [property]: text,
    };
    setListItems(updatedItems);
  };

  const [orderType, setOrderType] = useState("");

  const quantityTypes = [
    { quantityId: 1, label: "Gram " },
    { quantityId: 2, label: "Kg" },
    { quantityId: 3, label: "ml " },
    { quantityId: 3, label: "L" },
    { quantityId: 4, label: "Pcs " },
  ];
  const orderOptions = [
    { id: 1, label: "Drop or Pickup" },
    { id: 2, label: "Drop" },
    { id: 3, label: "Pickup" },
  ];

  const { loading, setLoading } = useContext(AuthContext);

  const onDonateMeal = async () => {
    const body = { listItems, orderType, ...resData };
    try {
      const res = await axios.post(
        `https://food-donation-backend.vercel.app/api/v1/posts/createPost`,
        body
      );
      if (res.data.status === "success") {
        alert("Submitted");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontFamily: "SemiBold", fontSize: 30, bottom: 10 }}>
          Help
        </Text>
        {/* Testing item list */}
        <View style={{ flex: 1 }}>
          <View>
            {/* Testing item list */}
            <View>
              {listItems.map((item, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <View style={{ flexDirection: "row", gap: 20 }}>
                    <View style={{ width: 150 }}>
                      <Text
                        style={{
                          fontFamily: "SemiBold",
                          fontSize: 14,
                        }}
                      >
                        Item {item.id}
                      </Text>
                      <TextInput
                        style={styles.inputText}
                        value={item.value}
                        onChangeText={(text) =>
                          handleValueChange(text, index, "value")
                        }
                        placeholder={`Item ${item.id}`}
                      />
                    </View>
                    {/* Meal options */}
                    <View style={{ width: 150 }}>
                      <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                        Meal Type {item.id}
                      </Text>
                      <View style={styles.inputText}>
                        <Picker
                          selectedValue={item.value}
                          onValueChange={(text) =>
                            handleValueChange(text, index, "qType")
                          }
                          mode="dropdown"
                          multiple={true}
                        >
                          {mealOptions.map((option) => (
                            <Picker.Item
                              key={option.id}
                              label={option.label}
                              value={option.label}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", gap: 20, marginTop: 5 }}>
                    <View style={{ width: 150 }}>
                      <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                        Item Quantity
                      </Text>
                      <View style={{ width: 140 }}>
                        <TextInput
                          style={styles.inputText}
                          keyboardType="numeric"
                          placeholder="0"
                          value={item.quantity}
                          onChangeText={(text) =>
                            handleValueChange(text, index, "quantity")
                          }
                        />
                      </View>
                    </View>

                    {/* Item Quantity */}
                    <View
                      style={{
                        width: 150,
                      }}
                    >
                      <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                        Quantity Type
                      </Text>
                      <View style={styles.inputText}>
                        <Picker
                          selectedValue={item.quantityType}
                          onValueChange={(text) =>
                            handleValueChange(text, index, "quantityType")
                          }
                          mode="dropdown"
                        >
                          {quantityTypes.map((option) => (
                            <Picker.Item
                              key={option.quantityId}
                              label={option.label}
                              value={option.label}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Order */}
        <View
          style={{
            width: 350,
            marginTop: 30,
          }}
        >
          <CustomButton text="Continue" onPress={onDonateMeal} type="primary" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 50,
    justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 150,
  },
  inputText: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 40,
  },
});
export default DonateMeal;
