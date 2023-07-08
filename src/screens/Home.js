import { useNavigation } from "@react-navigation/native";
import React from "react";
// import * as Sharing from 'expo-sharing';
import {
  Image,
  Pressable,
  Button,
  Share,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import * as FileSystem from "expo-file-system";
import icons from "../../assets/icons";
import Loading from "../components/Loading";
import SearchHeader from "../components/SearchHeader";
import Container from "../components/container";
import { userContext } from "../context/Provider";
import useFetchData from "../hook/useFetchData";
import TimeLimitComponent from "./TimeLimitComponent";
// import ShareScreen from "../components/Share";

const Home = () => {
  const { allData } = userContext();

  const { loading, error, data } = useFetchData(
    `posts/getPost?role=${allData?.userData?.role || allData?.guestData}`
  );
  console.log(data);
  const navigation = useNavigation();
  if (loading) return <Loading />;
  if (error) return alert(error.message);

  //   const onShare = async (post) => {
  //     console.log("inside",post?.imageUrls?.[0]);
  //     try {
  //       const { uri: localUri } = await FileSystem.downloadAsync(post?.imageUrls?.[0], FileSystem.documentDirectory + 'image.jpg');
  //       const result =  await Sharing.shareAsync(localUri, { dialogTitle: post.title });

  //         if (result.action === Share.sharedAction) {
  //             if (result.activityType) {
  //                 console.log('shared with activity type of : ', result.activityType)

  //             } else {
  //                 console.log('shared')
  //             }

  //         }
  //         else if(result.action===Share.dismissedAction){
  //             console.log('dismissed')
  //         }
  //     }catch(error){
  //         console.log(error.message)

  //     }
  // }
  return (
    <Container>
      <SearchHeader />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        {data?.map((item) => (
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
                  ></TimeLimitComponent>
                </Text>
                <Text style={styles.textItem2}>Dinner</Text>
              </View>
            </View>

            {/* <Button title='share' onPress={()=>onShare(item)}/> */}
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
  roleText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Home;
