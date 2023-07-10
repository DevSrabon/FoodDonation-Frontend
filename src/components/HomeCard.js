import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import TimeLimitComponent from "../screens/TimeLimitComponent";
import { useNavigation } from "@react-navigation/core";
const HomeCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View key={item._id} style={styles.cardContainer}>
      <Pressable
        onPress={() => navigation.navigate("donorPage", { user: item })}
      >
        <Image
          source={{ uri: item?.imageUrls?.[0] } || icons.fixedHeight}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </Pressable>
      <Text style={styles.cardDescription}>{item?.caption}</Text>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainerProfile}>
          <Image
            source={{ uri: item?.photo } || icons.profile}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={{ fontFamily: "SemiBold", fontSize: 20, top: 6 }}>
            {item?.userName}
          </Text>
          <Text style={styles.profileText}>{item?.postCategoryName}</Text>
          <Text style={styles.roleText}>
            {item?.role?.replace(/^./, item?.role[0].toUpperCase())}
          </Text>
        </View>
      </View>
      <View style={styles.contentCard}>
        <View style={styles.cardItemsContainer}>
          <Text style={styles.textItem1}>
            <TimeLimitComponent
              key={item?._id}
              previousTime={item?.updatedAt}
              countTime={item?.expiredTime}
            ></TimeLimitComponent>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeCard;

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
  roleText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
