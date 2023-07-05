import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        marginTop: 50,
        marginLeft: 15,
        marginBottom: 10,
      }}
    >
      <Text style={{ ...styles.typography, ...props.style }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typography: {
    fontFamily: "SemiBold",
    fontSize: 24,
    color: "#312E49",
  },
});

export default Header;
