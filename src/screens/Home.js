import { View, Text, FlatList } from "react-native";
import React from "react";

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

const Home = () => {
  return (
    <View>
      <FlatList
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
      />
      <Text style={{ fontFamily: "Bold", fontSize: 30 }}>Home</Text>
    </View>
  );
};

export default Home;
