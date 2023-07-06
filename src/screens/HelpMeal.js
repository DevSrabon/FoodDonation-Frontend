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


const DonateMeal = () => {
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


const DonateMeal = ({routeName="Help Meal"}) => {

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
}

export default DonateMeal;


// import { Picker } from "@react-native-picker/picker";
// import { useRoute } from "@react-navigation/native";
// import axios from "axios";
// import React, { useContext, useState } from "react";
// import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
// import CustomButton from "../components/CustomButton";
// import CustomInput from "../components/CustomInput";
// import Header from "../components/Header";
// import Loading from "../components/Loading";
// import Container from "../components/container";
// import Label from "../components/label";
// import { AuthContext } from "../context/Provider";

// const DonateMeal = () => {
//   const route = useRoute();
//   const numbers = route.params.number;
//   const resData = route.params.resData;

//   const [listItems, setListItems] = useState([]);

//   const mealOptions = [
//     { id: 1, label: "Vegetarian" },
//     { id: 2, label: "Non-Vegetarian" },
//     // { id: 3, label: "Meal3" },
//   ];

//   React.useEffect(() => {
//     const items = [];
//     for (let i = 1; i <= numbers; i++) {
//       items.push({
//         id: i,
//         value: "",
//         qType: "",
//         quantityType: "",
//         quantity: "",
//       });
//     }
//     setListItems(items);
//   }, [numbers]);

//   const handleValueChange = (text, index, property) => {
//     const updatedItems = [...listItems];
//     updatedItems[index] = {
//       ...updatedItems[index],
//       [property]: text,
//     };
//     setListItems(updatedItems);
//   };

//   const [orderType, setOrderType] = useState("");

//   const quantityTypes = [
//     { quantityId: 1, label: "Gram " },
//     { quantityId: 2, label: "Kg" },
//     { quantityId: 3, label: "ml " },
//     { quantityId: 3, label: "L" },
//     { quantityId: 4, label: "Pcs " },
//   ];
//   const orderOptions = [
//     { id: 1, label: "Drop or Pickup" },
//     { id: 2, label: "Drop" },
//     { id: 3, label: "Pickup" },
//   ];

//   const { loading, setLoading } = useContext(AuthContext);

//   const onDonateMeal = async () => {
//     const body = { listItems, orderType, ...resData };
//     try {
//       const res = await axios.post(
//         `https://food-donation-backend.vercel.app/api/v1/posts/createPost`,
//         body
//       );
//       if (res.data.status === "success") {
//         alert("Submitted");
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   if (loading) {
//     return <Loading />;
//   }
//   return (
//     <Container>
//       <ScrollView>
//         <Header>Help</Header>
//         <View style={{ flex: 1 }}>
//           {listItems.map((item, index) => (
//             <View key={index} style={{ marginBottom: 20 }}>
//               <View style={{ flexDirection: "row", gap: 20 }}>
//                 <View style={{ width: 150 }}>
//                   <Label>Item {item.id}</Label>
//                   <CustomInput
//                     placeholder={`Item ${item.id}`}
//                     value={item.value}
//                     setValue={(text) => handleValueChange(text, index, "value")}
//                   />
//                   {/* <TextInput
//                     style={styles.inputText}
//                     value={item.value}
//                     onChangeText={(text) =>
//                       handleValueChange(text, index, "value")
//                     }
//                     placeholder={`Item ${item.id}`}
//                   /> */}
//                 </View>
//                 {/* Meal options */}
//                 <View style={{ width: 150 }}>
//                   <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
//                     Meal Type {item.id}
//                   </Text>
//                   <View style={styles.inputText}>
//                     <Picker
//                       selectedValue={item.value}
//                       onValueChange={(text) =>
//                         handleValueChange(text, index, "qType")
//                       }
//                       mode="dropdown"
//                       multiple={true}
//                     >
//                       {mealOptions.map((option) => (
//                         <Picker.Item
//                           key={option.id}
//                           label={option.label}
//                           value={option.label}
//                         />
//                       ))}
//                     </Picker>
//                   </View>
//                 </View>
//               </View>
//               <View style={{ flexDirection: "row", gap: 20, marginTop: 5 }}>
//                 <View style={{ width: 150 }}>
//                   <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
//                     Item Quantity
//                   </Text>
//                   <View style={{ width: 140 }}>
//                     <TextInput
//                       style={styles.inputText}
//                       keyboardType="numeric"
//                       placeholder="0"
//                       value={item.quantity}
//                       onChangeText={(text) =>
//                         handleValueChange(text, index, "quantity")
//                       }
//                     />
//                   </View>
//                 </View>

//                 {/* Item Quantity */}
//                 <View
//                   style={{
//                     width: 150,
//                   }}
//                 >
//                   <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
//                     Quantity Type
//                   </Text>
//                   <View style={styles.inputText}>
//                     <Picker
//                       selectedValue={item.quantityType}
//                       onValueChange={(text) =>
//                         handleValueChange(text, index, "quantityType")
//                       }
//                       mode="dropdown"
//                     >
//                       {quantityTypes.map((option) => (
//                         <Picker.Item
//                           key={option.quantityId}
//                           label={option.label}
//                           value={option.label}
//                         />
//                       ))}
//                     </Picker>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Order */}
//         <View
//           style={{
//             width: 350,
//             marginTop: 30,
//           }}
//         >
//           <CustomButton text="Continue" onPress={onDonateMeal} type="primary" />
//         </View>
//       </ScrollView>
//     </Container>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "white",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginLeft: 150,
//   },
//   inputText: {
//     marginVertical: 10,
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     height: 40,
//   },
// });
// export default DonateMeal;

