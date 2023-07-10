import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
// import * as Sharing from 'expo-sharing';
import {
  FlatList,
  Image,
  Pressable,
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

import CustomAlert from "../components/CustomAlert";
import HomeCard from "../components/HomeCard";
// import ShareScreen from "../components/Share";

const Home = () => {
  const { allData } = userContext();
  const { loading, error, data } = useFetchData(
    `posts/getPost?role=${allData?.userData?.role || allData?.guestData}`
  );

  if (loading) return <Loading />;
  if (error) return setError(error.message);

  const [errorMessage, setError] = useState("");


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
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <HomeCard item={item} />}
          keyExtractor={(item) => item._id}
        />
                  {(errorMessage) && <CustomAlert type="error" value={errorMessage} />}

      </View>
    </Container>
  );
};

export default Home;
