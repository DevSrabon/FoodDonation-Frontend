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
import { userContext } from "../context/Provider";

const RoleSelection = () => {
  const navigation = useNavigation();
  const [update,  setUpdate] = useState("");
  const [updatecategory, setUpdatecategory] = useState("")
  const [n, setn] = useState(0)
 // const { user } = userContext();

  const [loading, setLoading] = useState(false);
  const [donaropen, setDonaropen] = useState(false);
  const [transporteropen, setTransporteropen] = useState(false)
  const [foodneederopen, setFoodneederopen] = useState(false)
  const AniDonar = useRef(new Animated.Value(1500)).current;
  const Anitransporter = useRef(new Animated.Value(1500)).current;
  const Anifoodneeder = useRef(new Animated.Value(1500)).current;
  function DonarAni() {
    Animated.timing(AniDonar, {
      toValue: donaropen ? 0 : 1500,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function transporterAni() {
    Animated.timing(Anitransporter, {
      toValue: transporteropen ? 0 : 1500,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function foodneederAni() {
    Animated.timing(Anifoodneeder, {
      toValue: foodneederopen ? 0 : 1500,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const toggle = () => {
    
   
    DonarAni()
    
    
   
   // setTransporteropen(!transporteropen)
    transporterAni()
  
  
  
  // setFoodneederopen(!foodneederopen)
    foodneederAni()
  
  }
 
  function Check() {
    console.warn("clicked");
  }

  if (loading) return <Loading />;
  return (
    <Container>
     
        <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 20,
            color: "#B4AAF2",
            marginTop:40
          }}
        >
          Welcome,
        </Text>
       
     
     
      <Header>Choose Your Role</Header>
     
      <View style={styles.boxContainer}>
        <Pressable
          style={[styles.box, update === "donor" && styles.selectedBox]}
          onPress={() => {setUpdate("donor"),setDonaropen(true),setFoodneederopen(false),setTransporteropen(false),toggle()}}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Donor
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who donates the food
          </Text>
        </Pressable>
        <Pressable
          style={[styles.box, update === "transporter" && styles.selectedBox]}
          onPress={() => {setUpdate("transporter"),setn(2),setTransporteropen(true),setDonaropen(false),setFoodneederopen(false),toggle()}}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Transporter
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who helps Transporting the food
          </Text>
        </Pressable>
        <Pressable
          style={[styles.box, update === "needy" && styles.selectedBox]}
          onPress={() => {setUpdate("needy"),setFoodneederopen(true),setTransporteropen(false),setDonaropen(false),toggle()}}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Food Needier
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who needs the food
          </Text>
        </Pressable>
      </View>
     
      <View
        style={{ flex: 3, width: "90%", alignItems: "center", marginTop: 20 }}
      >
        
        {/* <CustomButton text="Continue" onPress={()=>{toggle()}} type="primary" /> */}
        
      </View>

      
   {/* ////////////////////////////////1111 */}
    <Animated.View style={{position:'absolute',width:'100%',
    height:500, top:'45%',
     paddingHorizontal: 10, transform: [{ translateY:AniDonar }]}}>
      
      
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 20,
            color: "#B4AAF2",
          }}
        >
          Donar,
        </Text>
        <Pressable style={{padding:10,paddingLeft:30,}} onPress={()=>{setDonaropen(false),toggle()}}>
        <Image style={{width:22,height:22,}} source={require('../../assets/icons/close.png')} >
        </Image>
      </Pressable>
        </View>

        {/* <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 22,
            color: "black",
          }}
        >
          Choose Your role
        </Text> */}

        <Pressable
          style={[styles.Modalbox, updatecategory === "RestaurantOwner" && styles.selectedBox]}
          onPress={() =>  setUpdatecategory("RestaurantOwner")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Restaurant Owner
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who donates the food
          </Text>
        </Pressable>
        <Pressable
          style={[styles.Modalbox, updatecategory === "CateringService" && styles.selectedBox]}
          onPress={() =>  setUpdatecategory("CateringService")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Catering Service
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who helps Transporting the food
          </Text>
        </Pressable>
        <Pressable
          style={[styles.Modalbox, updatecategory === "GroceryStore" && styles.selectedBox]}
          onPress={() =>  setUpdatecategory("GroceryStore")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Grocery Store
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who needs the food
          </Text>
        </Pressable>
        <Pressable
          style={[styles.Modalbox, updatecategory === "Normalpeople" && styles.selectedBox]}
          onPress={() => { setUpdatecategory("Normalpeople")}}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
         Normal people
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who needs the food
          </Text>
        </Pressable>

       {updatecategory!="" && <CustomButton text="Continue" onPress={() => (navigation.navigate('profile', { role: update, subRole: updatecategory }))} type="primary" />}
    </Animated.View>
   {/* //////////////////////////////////222 */}
    <Animated.View style={{position:'absolute',width:'100%',
    height:500,backgroundColor:'#fff',top:'45%', 
     paddingHorizontal: 10, transform: [{ translateY:Anitransporter }]}}>
      
      
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 20,
            color: "#B4AAF2",
          }}
        >
          Transporter,
        </Text>
        <Pressable style={{padding:10,paddingleft:20}} onPress={()=>{setTransporteropen(false),toggle()}}>
        <Image style={{width:22,height:22,}} source={require('../../assets/icons/close.png')} >
        </Image>
      </Pressable>
        </View>

        {/* <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 22,
            color: "black",
          }}
        >
          Choose Your role
        </Text> */}

        <Pressable
          style={[styles.Modalbox, updatecategory === "Nonprofit" && styles.selectedBox]}
          onPress={() =>  setUpdatecategory("Nonprofit")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Non profit Organization
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who helps Transporting the food
          </Text>
        </Pressable>
        <Pressable
          style={[styles.Modalbox, updatecategory === "Foodbanks" && styles.selectedBox]}
          onPress={() =>  setUpdatecategory("Foodbanks")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Food banks
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who needs the food
          </Text>
        </Pressable>

        {updatecategory!="" && <CustomButton text="Continue" onPress={() => (navigation.navigate('profile', { role: update, subRole: updatecategory }))} type="primary" />}
    </Animated.View>
    {/* /////////////////////////////3333 */}
    <Animated.View style={{position:'absolute',width:'100%',
    height:500,backgroundColor:'#fff',top:'45%', 
     paddingHorizontal: 10, transform: [{ translateY:Anifoodneeder }]}}>
      
      
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 20,
            color: "#B4AAF2",
          }}
        >
          Food Needier,
        </Text>
        <Pressable style={{padding:10}} onPress={()=>{setFoodneederopen(false),toggle()}}>
        <Image style={{width:20,height:20,}} source={require('../../assets/icons/close.png')} >
        </Image>
      </Pressable>
        </View>

        <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 22,
            color: "black",
          }}
        >
          Choose Your role
        </Text>

        <Pressable
          style={[styles.Modalbox, updatecategory === "Nonprofit" && styles.selectedBox]}
          onPress={() =>  setUpdatecategory("Nonprofit")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Non profit Organization
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who donates the food
          </Text>
        </Pressable>
        <Pressable
          style={[styles.Modalbox, updatecategory === "Orphanage" && styles.selectedBox]}
          onPress={() =>  setUpdatecategory("Orphanage")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Orphanage
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who helps Transporting the food
          </Text>
        </Pressable>
        <Pressable
          style={[styles.Modalbox, updatecategory === "foodbanks" && styles.selectedBox]}
          onPress={() =>  setUpdatecategory("foodbanks")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Food banks
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who needs the food
          </Text>
        </Pressable>

        {updatecategory!="" && <CustomButton text="Continue" onPress={() => (navigation.navigate('profile', { role: update, subRole: updatecategory }))} type="primary" />}
    </Animated.View>
   
    </Container>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    //flex: 1,
   // alignSelf: "center",
    justifyContent: "flex-start",
   // backgroundColor:'pink'
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
