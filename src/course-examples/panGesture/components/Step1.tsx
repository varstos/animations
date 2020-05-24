import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent } from "react-native-redash";
import Animated, {
  Value,
  block,
  cond,
  eq,
  set,
  add,
} from "react-native-reanimated";

import { BlylScreen } from "../../../universal-ui/blylScreen";
import { BlylCard } from "../../../universal-ui/blylCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const withOffset = (
  value: Animated.Value<number>,
  state: Animated.Value<State>
) => {
  const offset = new Value(0);
  return block([
    cond(
      eq(state, State.END),
      [set(offset, add(offset, value)), offset],
      add(offset, value)
    ),
  ]);
};
export default () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
  });
  const translateX = withOffset(translationX, state);
  const translateY = withOffset(translationY, state);
  return (
    <SafeAreaProvider>
      <BlylScreen>
        <View style={styles.container}>
          <PanGestureHandler {...gestureHandler}>
            <Animated.View
              style={{ transform: [{ translateX }, { translateY }] }}
            >
              <BlylCard
                kind={"four"}
                containerSize={{ width: 240, height: 150 }}
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </BlylScreen>
    </SafeAreaProvider>
  );
};
