import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";

import SimpleActivityIndicator from "./SimpleActivityIndicator";
import {
  BlylButton,
  BlylScreen,
  ElevatedContainer,
} from "../../../universal-ui";

const {
  Clock,
  Value,
  useCode,
  set,
  block,
  cond,
  startClock,
  stopClock,
  clockRunning,
  and,
  not,
  eq,
  timing,
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

const runTiming = (clock: Animated.Clock): Animated.Node<number> => {
  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  const config = {
    toValue: new Value(1),
    duration: 1000,
    easing: Easing.linear,
  };
  return block([
    cond(
      not(clockRunning(clock)),
      set(state.time, 0),
      timing(clock, state, config)
    ),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, cond(eq(state.position, 1), 0, 1)),
    ]),
    state.position,
  ]);
};

const Timing = () => {
  const [play, setPlay] = useState(true);
  const { clock, isPlaying, progress } = useMemoOne(
    () => ({
      clock: new Clock(),
      isPlaying: new Value(0) as Animated.Value<0 | 1>,
      progress: new Value(0),
    }),
    []
  );
  isPlaying.setValue(play ? 0 : 1);
  useCode(
    () =>
      block([
        cond(and(isPlaying, not(clockRunning(clock))), startClock(clock)),
        cond(and(not(isPlaying), clockRunning(clock)), stopClock(clock)),
        set(progress, runTiming(clock)),
      ]),
    [clock, isPlaying, progress]
  );
  return (
    <BlylScreen>
      <View style={styles.container}>
        <SimpleActivityIndicator {...{ progress }} />
        <ElevatedContainer>
          <BlylButton
            title={play ? "Play" : "Pause"}
            kind={"primary"}
            onPress={() => setPlay((prev) => !prev)}
          />
        </ElevatedContainer>
      </View>
    </BlylScreen>
  );
};

export default Timing;
