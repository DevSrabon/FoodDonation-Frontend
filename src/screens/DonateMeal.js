import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomAlert from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import { AuthContext } from "../context/Provider";

const DonateMeal = () => {
  const route = useRoute();
  // const numbers = 2;

  // const resData = null;
  const numbers = route.params.number;

  const restData = route.params.resData;

  const navigation = useNavigation();
  const [listItems, setListItems] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mealOptions = [
    // { id: 1, label: "Non-Veg or Veg" },
    { id: 2, label: "Veg" },
    { id: 3, label: "Non-Veg" },
  ];

  React.useEffect(() => {
    const items = [];
    for (let i = 1; i <= numbers; i++) {
      items.push({
        id: i,
        value: "",
        qType: mealOptions[0].label,
        quantityType: quantityTypes[0].label,
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

  // const [expired, setExpired] = useState({});
  const [expired, setExpired] = useState({
    time: null,
    type: "min",
  });
  let expiredTime = 0;

  if (expired.type === "hrs" && expired.time) {
    expiredTime += expired.time * 60;
  } else if (expired.type === "days" && expired.time) {
    expiredTime += expired.time * 24 * 60;
  } else if (expired.time) {
    expiredTime = expired.time;
  }

  const quantityTypes = [
    { quantityId: 1, label: "Gram " },
    { quantityId: 2, label: "Kg" },
    { quantityId: 3, label: "ml " },
    { quantityId: 3, label: "L" },
    { quantityId: 4, label: "Pcs " },
  ];

  const orderOptions = [
    // { id: 1, label: "Drop or Pickup" },
    { id: 2, label: "Drop" },
    { id: 3, label: "Pickup" },
  ];
  const [orderType, setOrderType] = useState(orderOptions[0]?.label);
  const expiredOptions = [
    { id: 1, label: "min" },
    { id: 2, label: "hrs" },
    { id: 3, label: "days" },
  ];

  const { loading, setLoading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }

  const onDonateMeal = async () => {
    if (restData?.role === "donor") {
      if (expiredTime <= 0 || isNaN(expiredTime)) {
        return setError(
          "Expired Time should be more than 0 minutes and must be in Number"
        );
      }
    }
    for (const item of listItems) {
      if (
        !item.value ||
        !item.qType ||
        !item.quantity ||
        !item.quantityType ||
        isNaN(item.quantity)
      ) {
        return setError(
          "Please fill in all the item details and Item Quantity must be in Number"
        );
      }
    }
    setLoading(true);
    const body = { listItems, expiredTime, orderType, ...restData };
    try {
      const res = await axios.post(
        `https://food-donation-backend-production.vercel.app/api/v1/posts/createPost`,
        body
      );
      if (res.data.status === "success") {
        setSuccess("Submitted");
        navigation.navigate("user");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView>
        <Header>{restData?.role === "donate" ? "Donate" : "Help"}</Header>

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

                  <View style={styles.inputText}>
                    <Picker
                      selectedValue={item.qType}
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
                <View style={{ width: 150 }}></View>
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
                </View>

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
          {/* expired */}
          {restData?.role === "donor" && (
            // {1 && (
            <>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ width: "50%" }}>
                  <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                    Expired Time
                  </Text>
                  <CustomInput
                    placeholder={expired.time || "0"}
                    value={expired.time}
                    setValue={(number) =>
                      setExpired((prev) => ({ ...prev, time: number }))
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                    Expired Type
                  </Text>
                  <View style={styles.inputText}>
                    <Picker
                      selectedValue={expired.type}
                      onValueChange={(text) =>
                        setExpired((prev) => ({ ...prev, type: text }))
                      }
                      mode="dropdown"
                    >
                      {expiredOptions.map((option) => (
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
            </>
          )}

          {error && <CustomAlert type="error" value={error} />}
          {success && <CustomAlert type="success" value={success} />}

          {/* Order */}

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

export default DonateMeal;
