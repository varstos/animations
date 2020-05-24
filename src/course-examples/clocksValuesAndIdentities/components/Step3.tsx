import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Value, useCode, cond, eq, Clock, add, Extrapolate, interpolate, startClock, set, not } from "react-native-reanimated";
import { useClock, useValues } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  component: {
    height: 100,
    width: 150,
  },
  button: {
    marginTop: 20,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  }
});

const duration = 1000;

export default () => {
  const [show, setShow] = useState(true);
  const clock = useClock([]);
  const [startTime, from, to] = useValues([0, 0, 0], []);
  const startAnimation = new Value(1);
  const endTime = add(startTime, duration);
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });
  useCode(() => [
    cond(eq(startAnimation, 1), [
      startClock(clock),
      set(from, opacity),
      set(to, not(to)),
      set(startTime, clock),
      set(startAnimation, 0),
    ])
  ], [clock, from, opacity, startAnimation, startTime, to]);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={{ opacity }}>
          <View>
            <View style={[{backgroundColor: "black"}, styles.component]} />
            <View style={[{backgroundColor: "orange"}, styles.component]}/>
          </View>
        </Animated.View>
        <TouchableOpacity style={styles.button} onPress={() => setShow((prev) => !prev)}>
          <Text style={styles.buttonText}>{show ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
