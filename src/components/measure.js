import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const Measure = () => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#EFEDF8",
        borderColor: "#B4AAF2",
        borderRadius: 5,
        padding: 10,
        gap: 5,
        marginTop: 10,
      }}
    >
      <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
        Food Availability
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Medium", fontSize: 13 }}>Cakes : 1kg</Text>
        <View style={styles.footer}>
          <Feather
            onPress={decreaseQuantity}
            name="minus-circle"
            size={18}
            color="gray"
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <Feather
            onPress={increaseQuantity}
            name="plus-circle"
            size={18}
            color="gray"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Medium", fontSize: 13 }}>Milk : 1.7L</Text>
        <View style={styles.footer}>
          <Feather
            onPress={decreaseQuantity}
            name="minus-circle"
            size={18}
            color="gray"
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <Feather
            onPress={increaseQuantity}
            name="plus-circle"
            size={18}
            color="gray"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Medium", fontSize: 13 }}>
          Cookies : 500g
        </Text>
        <View style={styles.footer}>
          <Feather
            onPress={decreaseQuantity}
            name="minus-circle"
            size={18}
            color="gray"
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <Feather
            onPress={increaseQuantity}
            name="plus-circle"
            size={18}
            color="gray"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderColor: "#B4AAF2",
    borderRadius: 7,
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 10,
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "gray",
  },
});
export default Measure;
