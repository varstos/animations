import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Animated, { multiply, interpolate, not } from "react-native-reanimated";

import { useTransition } from "react-native-redash";
import { BlylScreen } from "../../../universal-ui/blylScreen";
import { BlylCard } from "../../../universal-ui/blylCard";
import { ElevatedContainer } from "../../../universal-ui/elevatedContainer";
import { BlylButton } from "../../../universal-ui/blylButton";

const cards = [
  { id: "1", kind: "four" as const },
  { id: "2", kind: "six" as const },
  { id: "3", kind: "five" as const },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

const transformOriginVar = -120;
export default () => {
  const [toggled, setToggled] = useState<0 | 1>(0);
  const transition = useTransition(toggled, not(toggled));
  return (
    <BlylScreen>
      <View style={styles.container}>
        {cards.map((card, index) => {
          const direction = interpolate(index, {
            inputRange: [0, 1, 2],
            outputRange: [-1, 0, 1],
          });
          const rotate = multiply(
            direction,
            interpolate(transition, {
              inputRange: [0, 1],
              outputRange: [0, Math.PI / 6],
            })
          );
          return (
            <Animated.View
              key={card.id}
              style={[
                styles.overlay,
                {
                  transform: [
                    { translateX: transformOriginVar },
                    { rotate },
                    { translateX: -transformOriginVar },
                  ],
                },
              ]}
            >
              <BlylCard
                containerSize={{ width: 240, height: 150 }}
                kind={card.kind}
              />
            </Animated.View>
          );
        })}
      </View>
      <ElevatedContainer>
        <BlylButton
          title={toggled ? "Reset" : "Start"}
          kind="secondary"
          onPress={() => setToggled(toggled ? 0 : 1)}
        />
      </ElevatedContainer>
    </BlylScreen>
  );
};
