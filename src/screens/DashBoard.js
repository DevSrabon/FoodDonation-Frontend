import axios from "axios";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InitContainer from "../components/initContainer";

const DashBoard = () => {
  const [count, setCount] = React.useState({});

  const fetchData = async () => {
    const res = await axios.get(
      "https://food-donation-backend.vercel.app/api/v1/dashboard/getCount?"
    );
    if (res.data) setCount(res.data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <InitContainer>
      <Text
        style={{
          marginTop: 40,
          color: "white",
          fontFamily: "Bold",
          fontSize: 28,
        }}
      >
        Dashboard
      </Text>

      <View style={styles.topContainer}></View>
      <View style={styles.subContainer}>
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.shadow]}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Total Users</Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {count?.users}
            </Text>
          </View>
          <View style={[styles.card, styles.shadow]}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Total Donor</Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {count?.donor}
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.shadow]}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Total Needy</Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {count?.needy}
            </Text>
          </View>
          <View style={[styles.card, styles.shadow]}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Total Transporter
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {count?.transporter}
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.shadow]}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Total Posts</Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {count?.posts}
            </Text>
          </View>
          <View style={[styles.card, styles.shadow]}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Community Posts
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {count?.community}
            </Text>
          </View>
        </View>
      </View>
    </InitContainer>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.1,
  },
  subContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 17,
    borderTopEndRadius: 17,
    // maxHeight: 00,
    // justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "45%",
    height: 150,
    marginVertical: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    elevation: 20,
    shadowColor: "#52006A",
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    gap: 15,
    paddingHorizontal: 10,
  },
});

export default DashBoard;
