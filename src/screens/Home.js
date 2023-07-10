import React from "react";
import { FlatList, View } from "react-native";
import Loading from "../components/Loading";
import SearchHeader from "../components/SearchHeader";
import Container from "../components/container";
import { userContext } from "../context/Provider";
import useFetchData from "../hook/useFetchData";
import HomeCard from "../components/HomeCard";

const Home = () => {
  const { allData } = userContext();
  const { loading, error, data } = useFetchData(
    `posts/getPost?role=${allData?.userData?.role || allData?.guestData}`
  );

  if (loading) return <Loading />;
  if (error) return alert(error.message);
  return (
    <Container>
      <SearchHeader />
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <HomeCard item={item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </Container>
  );
};

export default Home;
