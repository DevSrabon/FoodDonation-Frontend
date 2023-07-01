import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddImages = ({ imageUrls, takePhoto }) => {
  return (
    <View style={{ height: 120, width: "100%" }}>
      <View style={styles.imageHeader}>
        <Text style={styles.imageHeaderText}>Image</Text>
        <TouchableOpacity onPress={takePhoto} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {imageUrls.length > 0 &&
          imageUrls.map((img, index) => (
            <Image key={index} style={styles.image} source={{ uri: img }} />
          ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageHeader: {
    backgroundColor: "#fffff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
  },
  imageHeaderText: {
    fontFamily: "SemiBold",
    fontSize: 20,
  },
  addButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    textAlign: "right",
  },
  addButtonLabel: {
    color: "gray",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    height: 80,
    flexDirection: "row",
    gap: 5,
    marginLeft: 20,
    justifyContent: "flex-start",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "stretch",
    backgroundColor: "black",
    borderRadius: 8,
  },
});
export default AddImages;
