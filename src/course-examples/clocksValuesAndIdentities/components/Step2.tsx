import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Value, useCode, cond, eq, Clock, add, Extrapolate, interpolate, startClock, set, not } from "react-native-reanimated";

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

export default () => {
  const clock = new Clock();
  const startAnimation = new Value<0 | 1>(0);
  const startTime = new Value<number>(0);
  const duration = 1000;
  const endTime = add(startTime, duration);
  const from = new Value<0 | 1>(0);
  const to = new Value<0 | 1>(1);
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
        <TouchableOpacity style={styles.button} onPress={() => startAnimation.setValue(1)}>
          <Text style={styles.buttonText}>{"Toggle"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
