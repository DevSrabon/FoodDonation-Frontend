import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";

const InitContainer = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: StatusBar.currentHeight,
    backgroundColor: "#B4AAF2",
  },
});

export default InitContainer;
