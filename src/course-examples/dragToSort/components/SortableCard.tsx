import React from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { panGestureHandler } from "react-native-redash";
import { BlylCard, BlylCardProps } from "../../../universal-ui/blylCard";
import { withTransition } from "../../../utils/AnimationHelper";

const defaultCardHeight = Dimensions.get("window").height / 4 - 16;
const defaultCardWidth = Dimensions.get("window").width - 32;

export const CARD_HEIGHT = defaultCardHeight + 24;
const { width } = Dimensions.get("window");
const {
  Value,
  eq,
  and,
  neq,
  cond,
  useCode,
  divide,
  round,
  multiply,
  block,
  set,
  diff,
  lessThan,
  add,
  greaterThan,
  abs,
  not,
} = Animated;

const isMoving = (position: Animated.Node<number>) => {
  const delta = diff(position);
  const noMovementFrames = new Value(0);
  return cond(
    lessThan(abs(delta), 1e-3),
    [
      set(noMovementFrames, add(noMovementFrames, 1)),
      not(greaterThan(noMovementFrames, 20)),
    ],
    [set(noMovementFrames, 0), 1]
  );
};

export const withOffset = ({
  offset,
  value,
  state: gestureState,
}: {
  offset: Animated.Adaptable<number>;
  value: Animated.Value<number>;
  state: Animated.Value<State>;
}) => {
  const safeOffset = new Value(0);
  return cond(
    eq(gestureState, State.ACTIVE),
    add(safeOffset, value),
    set(safeOffset, offset)
  );
};

interface SortableCardProps extends BlylCardProps {
  offsets: Animated.Value<number>[];
  index: number;
}

// export default ({ card, index, offsets }: SortableCardProps) => {
//   const {
//     gestureHandler,
//     translationX,
//     velocityX,
//     translationY,
//     velocityY,
//     state,
//   } = panGestureHandler();
//   const zIndex = cond(eq(state, State.ACTIVE), 100, 1);
//   const x = withSafeOffset(translationX, state, 0);
//   const y = withSafeOffset(state, offsets[index], translationY);
//   const currentOffset = multiply(max(floor(divide(y, CARD_HEIGHT)), 0), CARD_HEIGHT);
//   const translateX = withTransition(x, velocityX, state);
//   const translateY = withTransition(y, velocityY, state);
//   useCode(
//     block(
//       offsets.map(offset =>
//         cond(eq(offset, currentOffset), [
//           set(offset, offsets[index]),
//           set(offsets[index], currentOffset),
//         ])
//       )
//     ),
//     []
//   );

const SortableCard = ({
  kind,
  index,
  offsets,
}: SortableCardProps) => {
  const { gestureHandler, translation, velocity, state } = panGestureHandler();
  const x = withOffset({
    offset: 0,
    value: translation.x,
    state,
  });
  const translateX = withTransition(x, velocity.x, state);
  const y = withOffset({
    offset: offsets[index],
    value: translation.y,
    state,
  });
  const translateY = withTransition(y, velocity.y, state);
  const zIndex = cond(
    eq(state, State.ACTIVE),
    200,
    cond(isMoving(translateY), 100, 1)
  );
  const currentIndex = round(divide(y, CARD_HEIGHT));
  const currentOffset = multiply(currentIndex, CARD_HEIGHT);
  useCode(
    () =>
      block([
        ...offsets.map((offset) =>
          cond(
            and(
              eq(currentOffset, offset),
              neq(currentOffset, offsets[index]),
              eq(state, State.ACTIVE)
            ),
            [
              set(offset, offsets[index]),
              set(offsets[index], currentOffset),
            ]
          )
        ),
      ]),
    [currentOffset, index, offsets, state]
  );

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height: CARD_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateY }, { translateX }],
          zIndex,
        }}
      >
        <BlylCard containerSize={{width: defaultCardWidth, height: defaultCardHeight}} {...{ kind }} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SortableCard;
