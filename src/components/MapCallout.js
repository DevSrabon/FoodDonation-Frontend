import { View, Text, Image } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { Platform } from "react-native";

const MapCallout = () => {
  const isAndroid = Platform.OS === "android";
  return (
    <View style={{ padding: 10, maxWidth: 120, alignItems: "center" }}>
      {isAndroid ? (
        <WebView
          source={{
            uri: "https://saiwa.ai/wp-content/uploads/2022/12/Image-Processing-.webp",
          }}
          style={{ borderRadius: 10, width: 120, height: 100 }}
        />
      ) : (
        <Image
          source={{
            uri: "https://saiwa.ai/wp-content/uploads/2022/12/Image-Processing-.webp",
          }}
          style={{ borderRadius: 10, width: 120, height: 100 }}
        />
      )}
    </View>
  );
};

export default MapCallout;
