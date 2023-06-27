import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import icons from "../../assets/icons";
import { userContext } from "../context/Provider";
import useFetchData from "../hook/useFetchData";
import CustomInput from "./CustomInput";
import Loading from "./Loading";

const SearchHeader = () => {
  const [serach, setSearch] = useState(0);
  const { user } = userContext();
  const { loading, error, data } = useFetchData(`users?email=${user?.email}`);

  if (loading) return <Loading />;

  if (error) return alert(error);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.typography}>
          <Text style={{ fontSize: 18, color: "#B4AAF2" }}> Wellcome,</Text>{" "}
          {data?.data?.name}
        </Text>
        <Image source={icons.notification} />
      </View>
      <View style={styles.searchView}>
        <CustomInput
          placeholder="Search here"
          value={serach}
          setValue={setSearch}
        />
        <Image source={icons.settings} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    paddingVertical: 12,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  searchView: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  typography: {
    fontFamily: "SemiBold",
    fontSize: 20,
  },
});

export default SearchHeader;
