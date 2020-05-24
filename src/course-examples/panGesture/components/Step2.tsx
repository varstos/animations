import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BlylScreen } from "../../../universal-ui/blylScreen";
import { BlylCard } from "../../../universal-ui/blylCard";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent } from "react-native-redash";
import Animated, {
  Value,
  block,
  cond,
  eq,
  set,
  add,
  diffClamp,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const withOffset = (
  value: Animated.Value<number>,
  state: Animated.Value<State>,
  offset: Animated.Value<number> = new Value(0)
) =>
  cond(
    eq(state, State.END),
    [set(offset, add(offset, value)), offset],
    add(offset, value)
  );

export default () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const offsetX = new Value((Dimensions.get("window").width - 240) / 2);
  const offsetY = new Value((Dimensions.get("window").height - 150) / 2);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
  });
  // const translateX = diffClamp(withOffset(translationX, state, offsetX), 0, Dimensions.get('window').width - 100);
  // const translateY = diffClamp(withOffset(translationY, state, offsetY), 0, Dimensions.get('window').height - 150);
  const translateX = withOffset(translationX, state, offsetX);
  const translateY = withOffset(translationY, state, offsetY);

  return (
    <BlylScreen>
      <View style={styles.container}>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View
            style={{ transform: [{ translateX }, { translateY }] }}
          >
            <BlylCard
              kind={"seven"}
              containerSize={{ width: 240, height: 150 }}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </BlylScreen>
  );
};
