import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";

const DonateMeal = () => {
  const route = useRoute();
  const numbers = route.params.number;

  const [listItems, setListItems] = useState([]);

  const mealOptions = [
    { id: 1, label: "Meal Type" },
    { id: 2, label: "Meal2" },
    { id: 3, label: "Meal3" },
  ];

  React.useEffect(() => {
    const items = [];
    for (let i = 1; i <= numbers; i++) {
      items.push({ id: i, value: "", type: "" });
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

  const [quantitySelection, setQuantitySelection] = useState({
    quantity: 0,
    quantityType: "",
    order: "",
  });

  const handleQualityChange = (value, property) => {
    setQuantitySelection((prev) => ({ ...prev, [property]: value }));
  };

  const quantityTypes = [
    { quantityId: 2, label: "Kg" },
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
    console.log("Donate meal listItems values ====", listItems);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontFamily: "SemiBold", fontSize: 30, bottom: 10 }}>
          Donate
        </Text>
        {/* Testing item list */}
        <View style={{ flex: 1 }}>
          <View>
            {/* Testing item list */}
            <View style={{ flex: 1 }}>
              {listItems.map((item, index) => (
                <View style={{ flexDirection: "row", gap: 3 }} key={index}>
                  <View style={{ width: 150 }}>
                    <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
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
                          handleValueChange(text, index, "type")
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
              ))}
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 3, marginTop: 50 }}>
          <View style={{ width: 150 }}>
            <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
              Item Quantity
            </Text>
            <View style={{ width: 140 }}>
              <TextInput
                style={styles.inputText}
                keyboardType="numeric"
                placeholder="0"
                value={quantitySelection.quantity.toString()}
                onChangeText={(text) => handleQualityChange(text, "quantity")}
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
                selectedValue={quantitySelection.quantityType.toString()}
                onValueChange={(text) =>
                  handleQualityChange(text, "quantityType")
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

        {/* Order */}
        <View
          style={{
            width: 300,
            marginTop: 30,
          }}
        >
          <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>Order</Text>
          <View style={styles.inputText}>
            <Picker
              selectedValue={quantitySelection.order}
              onValueChange={(value) => handleQualityChange(value, "order")}
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

// const renderNumberItem = ({ item }) => (
//   <>
//     {/* <View style={{ fontWeight: selectedNumbers.includes(item) ? 'bold' : 'normal' }}>
//      */}

//     <View >

//       {/* Testing item list */}
//       <View style={{ flex: 1, padding: 20 }}>
//         {listItems.map((item, index) => (

//           <View key={item.id} style={{ marginTop: 10 }}>
//             <Text>Item {item.id}:</Text>
//             <TextInput
//               value={item.value}
//               onChangeText={(text) => handleValueChange(text, index)}
//               placeholder={`Enter value for Item ${item.id}`}
//               style={{ borderWidth: 1, borderColor: 'gray', padding: 5 }}
//             />
//           </View>

//         ))}
//       </View>

//       <View style={{ flexDirection: 'row', gap: 3 }}>

//         <View style={{ width: 150 }}>
//           <Text
//             style={{ fontFamily: "SemiBold", fontSize: 14 }}
//           >
//             Item {item.id}
//           </Text>
//           <TextInput
//             style={styles.inputText}
//             value={item.value}
//             onChangeText={(text) => handleValueChange(text, index)}
//             placeholder={`Enter value for Item ${item.id}`}
//           // style={{ borderWidth: 1, borderColor: 'gray', padding: 5 }}
//           />
//         </View>

//         {/* Meal options */}
//         <View style={{
//           width: 150,

//         }}>
//           <Text
//             style={{ fontFamily: "SemiBold", fontSize: 14 }}
//           >
//             Meal Type
//           </Text>
//           <View style={styles.inputText}>
//             <Picker
//               selectedValue={selectedOptions}
//               onValueChange={handleOptionChange}
//               mode="dropdown"
//               multiple={true}
//             >
//               {mealOptions.map((option) => (
//                 <Picker.Item key={option.id} label={option.label} value={option.id} />
//               ))}
//             </Picker>
//           </View>
//         </View>

//       </View>

//     </View>
//   </>
// );
