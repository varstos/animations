import * as React from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

import { diffClamp, onGestureEvent } from "react-native-redash";
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
  decay,
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
const offsetX = new Value((containerWidth - cardWidth) / 2);
const offsetY = new Value((containerHeight - cardWidth) / 2);

const withDecay = (
  value: Animated.Node<number>,
  gestureState: Animated.Value<State>,
  offset: Animated.Value<number> = new Value(0),
  velocity: Animated.Value<number>
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity,
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    deceleration: 0.997,
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
        decay(clock, state, config),
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
  const translateX = diffClamp(
    withDecay(translationX, state, offsetX, velocityX),
    0,
    containerWidth - cardWidth
  );
  const translateY = diffClamp(
    withDecay(translationY, state, offsetY, velocityY),
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
            kind={"eight"}
            containerSize={{ width: cardWidth, height: cardHeight }}
          />
        </Animated.View>
      </PanGestureHandler>
    </BlylScreen>
  );
};
