import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";
import CustomInput from "../components/CustomInput";
import Container from "../components/container";
import Label from "../components/label";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import axios from "axios";

const HelpMeal = () => {
  const route = useRoute();
  const numbers = route.params.number;
  const resData = route.params.resData;
  const [listItems, setListItems] = useState([]);

  const mealOptions = [
    { id: 1, label: "Non-Veg or Veg" },
    { id: 2, label: "Veg" },
    { id: 3, label: "Non-Veg" },
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
  if (loading) {
    return <Loading />;
  }

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

  return (
    <Container>
      <ScrollView>
        <Header>Help</Header>

        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {listItems.map((item, index) => (
            <View
              key={index}
              style={{ alignItems: "center", marginBottom: 10 }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "48%" }}>
                  <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                    Item {item.id}
                  </Text>
                  <CustomInput
                    placeholder={`Item ${item.id}`}
                    value={item.value}
                    setValue={(text) => handleValueChange(text, index, "value")}
                  />
                </View>
                <View style={{ width: "48%" }}>
                  <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                    Meal Type
                  </Text>
                  {/* <Label style={{ marginLeft: 10 }}>Meal Type {item.id}</Label> */}

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
              <View style={{ flexDirection: "row", gap: 20 }}>
                <View style={{ width: 150 }}>
                  {/* <Label> Item {item.id}</Label>
                  <CustomInput
                    placeholder={`Item ${item.id}`}
                    value={item.value}
                    setValue={(text) => handleValueChange(text, index, "value")}
                  /> */}
                  {/* <TextInput
                    style={styles.inputText}
                    value={item.value}
                    onChangeText={(text) =>
                      handleValueChange(text, index, "value")
                    }
                    placeholder={`Item ${item.id}`}
                  /> */}
                </View>
                {/* Meal options */}
                {/* <View style={{ width: 150 }}>
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
                </View> */}
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "48%" }}>
                  <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                    Item Quantity
                  </Text>
                  <CustomInput
                    placeholder="0"
                    value={item.quantity}
                    setValue={(text) =>
                      handleValueChange(text, index, "quantity")
                    }
                    keyboardType="numeric"
                  />
                  {/* <View style={{}}>
                    <TextInput
                      style={styles.inputText}
                      keyboardType="numeric"
                      placeholder="0"
                      value={item.quantity}
                      onChangeText={(text) =>
                        handleValueChange(text, index, "quantity")
                      }
                    />
                  </View> */}
                </View>

                {/* Item Quantity */}

                <View style={{ width: "48%" }}>
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

        <View
          style={{
            alignSelf: "center",
            width: "96%",
            bottom: 15,
          }}
        >
          {routeName === "Donate" && (
            <View>
              <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                Order
              </Text>
              <View style={styles.inputText}>
                <Picker
                  selectedValue={orderType}
                  onValueChange={(value) => setOrderType(value)}
                  mode="dropdown"
                >
                  {orderOptions.map((option) => (
                    <Picker.Item
                      key={option.id}
                      label={option.label}
                      value={option.label}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )}
          <CustomButton text="Continue" onPress={onDonateMeal} type="primary" />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  inputText: {
    borderColor: "#A2A2A6",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    marginBottom: 20,
    justifyContent: "center",
    height: 38,
  },
});

export default HelpMeal;
