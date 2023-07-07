import { View, Text } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import Container from "./container";

const DropDown = () => {
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();

  const categories = [
    { key: "DO", value: "Donor" },
    { key: "NE", value: "Food Needier" },
    { key: "TR", value: "Transporter" },
  ];

  const subCategories = {
    DO: [
      { key: "1", value: "Restaurant Owner" },
      { key: "2", value: "Catering Services" },
      { key: "3", value: "Grocery Store" },
      { key: "4", value: "Normal People" },
    ],
    NE: [
      { key: "1", value: "Non-Profit Organisation" },
      { key: "2", value: "Orphanage" },
      { key: "3", value: "Food Banks" },
    ],
    TR: [
      { key: "1", value: "Non-Profit Organisation" },
      { key: "2", value: "Orphanage" },
      { key: "3", value: "Food Banks" },
    ],
  };
  return (
    <Container>
      <SelectList
        setSelected={setCategory}
        data={categories}
        placeholder="Select Your Role"
        defaultOption={{ key: "DO", value: "Donor" }}
      />
      <SelectList
        setSelected={setSubCategory}
        data={subCategories[category]}
        placeholder="Select SubCategory"
        defaultOption={subCategories[category]}
      />
    </Container>
  );
};

export default DropDown;
