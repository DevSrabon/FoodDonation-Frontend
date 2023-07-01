import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import icons from "../../assets/icons";
import Loading from "../components/Loading";
import SearchHeader from "../components/SearchHeader";
import Container from "../components/container";
import { userContext } from "../context/Provider";
import useFetchData from "../hook/useFetchData";

const Home = () => {
  const [search, setSearch] = useState(0);
  const { allData, setAllData } = userContext();
  const { loading, error, data } = useFetchData(
    `posts/getPost?role=${allData?.userData?.role}`
  );
  useEffect(() => {
    if (data) {
      setAllData((prev) => ({ ...prev, postData: data }));
    }
  }, [data, setAllData]);
  if (loading) return <Loading />;
  if (error) return alert(error.message);
  return (
    <Container>
      <SearchHeader />
      <ScrollView style={{ flex: 1, bottom: 250 }}>
        {data?.map((item) => (
          <View key={item._id} style={styles.cardContainer}>
            <Image
              source={{ uri: item?.imageUrls?.[0] } || icons.fixedHeight} // Replace with the path to your image
              style={styles.cardImage}
              resizeMode="cover"
            />
            <Text style={styles.cardDescription}>{item.caption}</Text>
            <View style={styles.profileContainer}>
              <View style={styles.imageContainerProfile}>
                <Image
                  source={icons.profile} // Replace with the path to your image
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={{ fontFamily: "SemiBold", fontSize: 20, top: 6 }}>
                  {item.userName}
                </Text>
                <Text style={styles.profileText}>{item.postCategoryName}</Text>
              </View>
            </View>
            <View style={styles.contentCard}>
              <View style={styles.cardItemsContainer}>
                <Text style={styles.textItem1}>Exp 20min</Text>
                <Text style={styles.textItem2}>Dinner</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  // Card
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 10,
    paddingHorizontal: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 5,
  },
  contentCard: {
    padding: 16,
  },

  cardDescription: {
    fontSize: 16,
    color: "#888888",
    marginTop: 16,
  },
  cardItemsContainer: {
    flexDirection: "row",
  },

  textItem1: {
    fontSize: 14,
    marginRight: 16,
    backgroundColor: "#F4A099",
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  textItem2: {
    fontSize: 16,
    marginRight: 16,
  },
  // profile
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  imageContainerProfile: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16,
  },
  profileImage: {
    flex: 1,
    width: null,
    height: null,
  },
  profileTextContainer: {
    flexDirection: "column",
  },
  profileText: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default Home;
