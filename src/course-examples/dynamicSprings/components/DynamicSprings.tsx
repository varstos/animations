import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent, clamp } from "react-native-redash";
import { BlylCard, BlylScreen } from "../../../universal-ui";
import { withSpring } from "../../../utils/AnimationHelper";

const cardHeight = 140;
const cardWidth = 260;
const {
  useCode,
  Clock,
  Value,
  cond,
  set,
  eq,
  add,
  spring,
  clockRunning,
  and,
  not,
  startClock,
  stopClock,
  block,
} = Animated;
const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 64;
const snapX = (containerWidth - cardWidth) / 2;
const snapY = (containerHeight - cardWidth) / 2;
const offsetX = new Value(snapX);
const offsetY = new Value(snapY);

const baseConfig = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 1,
};

const createConfig = () => ({
  x: { toValue: new Value(0), ...baseConfig },
  y: { toValue: new Value(0), ...baseConfig },
});

const createState = () => ({
  x: {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  },
  y: {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  },
});

export default () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY,
  });
  const translateX = withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    offset: offsetX,
    snapPoints: [snapX],
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    offset: offsetY,
    snapPoints: [snapY],
  });
  const clock = new Clock();
  const states = [createState(), createState()];
  const configs = [createConfig(), createConfig()];
  useCode(
    () =>
      block([
        startClock(clock),
        set(configs[0].x.toValue, translateX),
        set(configs[0].y.toValue, translateY),
        spring(clock, states[0].x, configs[0].x),
        spring(clock, states[0].y, configs[0].y),
        set(configs[1].x.toValue, states[0].x.position),
        set(configs[1].y.toValue, states[0].y.position),
        spring(clock, states[1].x, configs[1].x),
        spring(clock, states[1].y, configs[1].y),
      ]),
    [clock, configs, states, translateX, translateY]
  );

  return (
    <BlylScreen>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { translateX: states[1].x.position },
            { translateY: states[1].y.position },
          ],
        }}
      >
        <BlylCard
          kind={"nine"}
          containerSize={{ width: cardWidth, height: cardHeight }}
        />
      </Animated.View>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { translateX: states[0].x.position },
            { translateY: states[0].y.position },
          ],
        }}
      >
        <BlylCard
          kind={"eight"}
          containerSize={{ width: cardWidth, height: cardHeight }}
        />
      </Animated.View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ translateX }, { translateY }],
          }}
        >
          <BlylCard
            kind={"seven"}
            containerSize={{ width: cardWidth, height: cardHeight }}
          />
        </Animated.View>
      </PanGestureHandler>
    </BlylScreen>
  );
};
