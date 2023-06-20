import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "1",
    header: "Donate Food",
    details:
      "Food Donation is a Noble act so don’t let a person suffer from hunger",
  },
  {
    id: "2",
    header: "Publish Post",
    details:
      "Through a post a donor can publish about the availability of the food",
  },
  {
    id: "3",
    header: "Get Food Faster",
    details: "Giving the access to the people who can deliver the food",
  },
];

const InitialPage = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Initial </Text>
      <Pressable onPress={() => navigation.navigate("intro")}>
        <Text>Next Page</Text>
      </Pressable>
      {/* <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{data.header}</Text>
            <Text>{data.details}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      /> */}
    </View>
  );
};

export default InitialPage;
