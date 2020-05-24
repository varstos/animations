import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { onGestureEvent, clamp } from "react-native-redash";
import { BlylCard, BlylScreen } from "../../../universal-ui";

const cardHeight = 140;
const cardWidth = 260;
const {
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

const withSpring = (
  value: Animated.Node<number>,
  gestureState: Animated.Value<State>,
  offset: Animated.Value<number> = new Value(0),
  velocity: Animated.Value<number>,
  snapPoint: number
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity,
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: snapPoint,
  };

  const decayInterrupted = eq(gestureState, State.BEGAN);
  const finishDecay = [set(offset, state.position), stopClock(clock)];

  return block([
    cond(decayInterrupted, finishDecay),
    cond(
      eq(gestureState, State.END),
      [
        cond(and(not(clockRunning(clock)), not(state.finished)), [
          set(state.time, 0),
          startClock(clock),
        ]),
        spring(clock, state, config),
        cond(state.finished, finishDecay),
      ],
      [set(state.finished, 0), set(state.position, add(offset, value))]
    ),
    state.position,
  ]);
};

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
  const translateX = clamp(
    withSpring(translationX, state, offsetX, velocityX, snapX),
    0,
    containerWidth - cardWidth
  );
  const translateY = clamp(
    withSpring(translationY, state, offsetY, velocityY, snapY),
    0,
    containerHeight - cardHeight
  );
  return (
    <BlylScreen>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ translateX }, { translateY }],
          }}
        >
          <BlylCard
            kind={"nine"}
            containerSize={{ width: cardWidth, height: cardHeight }}
          />
        </Animated.View>
      </PanGestureHandler>
    </BlylScreen>
  );
};
