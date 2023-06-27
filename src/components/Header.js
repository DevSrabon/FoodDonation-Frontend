import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "flex-start",
        marginTop: 50,
        marginLeft: 15,
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
