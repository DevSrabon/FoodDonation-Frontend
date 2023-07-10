import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import icons from "../../assets/icons";
import { userContext } from "../context/Provider";

const RoleSelection = () => {
  const navigation = useNavigation();
  const [update, setUpdate] = useState("");
  const [updatecategory, setUpdatecategory] = useState("");
  const [n, setn] = useState(0);
  // const { user } = userContext();

  const [loading, setLoading] = useState(false);
  const [donaropen, setDonaropen] = useState(false);
  const [transporteropen, setTransporteropen] = useState(false);
  const [foodneederopen, setFoodneederopen] = useState(false);

  const AniDonar = useRef(new Animated.Value(1500)).current;
  const Anitransporter = useRef(new Animated.Value(1500)).current;
  const Anifoodneeder = useRef(new Animated.Value(1500)).current;

  function DonarAni() {
    Animated.timing(AniDonar, {
      toValue: donaropen ? 300 : 1500,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }

  function transporterAni() {
    Animated.timing(Anitransporter, {
      toValue: transporteropen ? 300 : 1500,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }

  function foodneederAni() {
    Animated.timing(Anifoodneeder, {
      toValue: foodneederopen ? 300 : 1500,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }

  const toggle = () => {
    if (n == 1) {
      setDonaropen(!donaropen);
      DonarAni();
    } else if (n == 2) {
      setTransporteropen(!transporteropen);
      transporterAni();
    } else if (n == 3) {
      setFoodneederopen(!foodneederopen);
      foodneederAni();
    }
  };

  function Check() {
    console.warn("clicked");
  }

  if (loading) return <Loading />;
  return (
    <Container>
      <Header style={{ color: "#B4AAF2" }}>Welcome,</Header>
      <Header>Choose Your Role</Header>

      <View style={styles.boxContainer}>
        <Pressable
          style={[styles.box, update === "donor" && styles.selectedBox]}
          onPress={() => {
            setUpdate("donor"), setn(1);
          }}
        >
          <Text style={styles.title}>Donor</Text>
          <Text style={styles.subTitle}>
            Person or an Organization who donates the food
          </Text>
        </Pressable>

        <Pressable
          style={[styles.box, update === "transporter" && styles.selectedBox]}
          onPress={() => {
            setUpdate("transporter"), setn(2);
          }}
        >
          <Text style={styles.title}>Transporter</Text>
          <Text style={styles.subTitle}>
            Person or an Organization who helps Transporting the food
          </Text>
        </Pressable>

        <Pressable
          style={[styles.box, update === "needy" && styles.selectedBox]}
          onPress={() => {
            setUpdate("needy"), setn(3);
          }}
        >
          <Text style={styles.title}>Food Needier</Text>
          <Text style={styles.subTitle}>
            Person or an Organization who needs the food
          </Text>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          text="Continue"
          onPress={() => {
            toggle();
          }}
          type="primary"
        />
      </View>
      {/* //////////////////////////////////1111 */}
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: 500,
          backgroundColor: "#fff",
          top: 30,
          paddingHorizontal: 10,
          paddingVertical: 20,
          transform: [{ translateY: AniDonar }],
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Header style={{ color: "#B4AAF2" }}> Donar,</Header>
          <Pressable style={{ padding: 10 }} onPress={() => toggle()}>
            <Image style={{ width: 20, height: 20 }} source={icons.close} />
          </Pressable>
        </View>
        {/* <Header>Choose Your Role</Header> */}
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Pressable
            style={[
              styles.box,
              updatecategory === "RestaurantOwner" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("RestaurantOwner")}
          >
            <Text style={styles.title}>Restaurant Owner</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who donates the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "CateringService" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("CateringService")}
          >
            <Text style={styles.title}>Catering Service</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who helps Transporting the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "GroceryStore" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("GroceryStore")}
          >
            <Text style={styles.title}>Grocery Store</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who needs the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "Normalpeople" && styles.selectedBox,
            ]}
            onPress={() => {
              setUpdatecategory("Normalpeople");
            }}
          >
            <Text style={styles.title}>Normal people</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who needs the food
            </Text>
          </Pressable>
        </View>
        <View style={{ flex: 1, alignSelf: "center", width: "90%" }}>
          <CustomButton
            text="Continue"
            onPress={() =>
              navigation.navigate("addRestaurant", {
                role: update,
                subRole: updatecategory,
              })
            }
            type="primary"
          />
        </View>
      </Animated.View>
      {/* //////////////////////////////////222 */}
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: 500,
          backgroundColor: "#fff",
          top: 30,
          paddingHorizontal: 10,
          paddingVertical: 20,
          transform: [{ translateY: Anitransporter }],
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Header style={{ color: "#B4AAF2" }}> Transporter,</Header>

          <Pressable style={{ padding: 10 }} onPress={() => toggle()}>
            <Image style={{ width: 20, height: 20 }} source={icons.close} />
          </Pressable>
        </View>
        {/* <Header>Choose Your Role</Header> */}
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Pressable
            style={[
              styles.box,
              updatecategory === "Nonprofit" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Nonprofit")}
          >
            <Text style={styles.title}>Non profit Organization</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who helps Transporting the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "Foodbanks" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Foodbanks")}
          >
            <Text style={styles.title}>Food banks</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who needs the food
            </Text>
          </Pressable>
        </View>

        <View style={styles.btnContainer}>
          <CustomButton
            text="Continue"
            onPress={() =>
              navigation.navigate("addRestaurant", {
                role: update,
                subRole: updatecategory,
              })
            }
            type="primary"
          />
        </View>
      </Animated.View>
      {/* /////////////////////////////3333 */}
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: 500,
          backgroundColor: "#fff",
          top: 30,
          paddingHorizontal: 10,
          paddingVertical: 20,
          transform: [{ translateY: Anifoodneeder }],
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Header style={{ color: "#B4AAF2" }}>Food Needier,</Header>

          <Pressable style={{ padding: 10 }} onPress={() => toggle()}>
            <Image style={{ width: 20, height: 20 }} source={icons.close} />
          </Pressable>
        </View>
        {/* <Header>Choose Your Role</Header> */}
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Pressable
            style={[
              styles.box,
              updatecategory === "Nonprofit" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Nonprofit")}
          >
            <Text style={styles.title}>Non profit Organization</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who donates the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "Orphanage" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Orphanage")}
          >
            <Text style={styles.title}>Orphanage</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who helps Transporting the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "foodbanks" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("foodbanks")}
          >
            <Text style={styles.title}>Food banks</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who needs the food
            </Text>
          </Pressable>
        </View>

        <View style={styles.btnContainer}>
          <CustomButton
            text="Continue"
            onPress={() =>
              navigation.navigate("addRestaurant", {
                role: update,
                subRole: updatecategory,
              })
            }
            type="primary"
          />
        </View>
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    // flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "#252525",
  },
  subTitle: {
    fontFamily: "Medium",
    fontSize: 13,
    color: "#667085",
    paddingVertical: 8,
  },
  btnContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  box: {
    width: 340,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 20,
    marginVertical: 5,
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#F5F6F7",
    borderColor: "#F5F6F7",
  },
  selectedBox: {
    backgroundColor: "#efedf8",
    borderWidth: 1,
    borderColor: "#B4AAF2",
    borderRadius: 6,
  },
  Modalbox: {
    width: "100%",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 20,
    marginVertical: 5,
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#F5F6F7",
    borderColor: "#F5F6F7",
  },
});
export default RoleSelection;
