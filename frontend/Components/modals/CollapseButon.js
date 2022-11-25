import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";

export default function CollapseButon() {
  const [height] = useState(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    Animated.timing(height, {
      toValue: !isExpanded ? 200 : 0,
      duration: 150,
      useNativeDriver: false
    }).start();
  }, [isExpanded, height]);

  // console.log('rerendered');

  return (
    <View style={styles.app}>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
        style={styles.toggle}
      >
        <Text style={styles.toggleText}>Expand</Text>
      </TouchableOpacity>
        <Animated.View
        style={{ height}}
        ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {},
  toggle: {
    width: 100,
    height: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  toggleText: {
    color: "#000"
  }
});
