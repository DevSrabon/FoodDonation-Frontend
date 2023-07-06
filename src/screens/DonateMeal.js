
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";
import CustomInput from "../components/CustomInput";

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
