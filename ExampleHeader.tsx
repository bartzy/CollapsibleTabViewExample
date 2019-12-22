import React from "react";
import { Text, StyleSheet, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "green",
    paddingHorizontal: 10,
    alignContent: "center",
    alignItems: "center"
  }
});

interface ExampleHeaderProps {
  style?: Animated.AnimateStyle<ViewStyle>;
}

const ExampleHeader: React.FC<ExampleHeaderProps> = ({ style }) => {
  return (
    <Animated.View style={[styles.container, style]}>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
          letterSpacing: 0.2
        }}
      >
        Collapsible Header
      </Text>
    </Animated.View>
  );
};

export default ExampleHeader;
