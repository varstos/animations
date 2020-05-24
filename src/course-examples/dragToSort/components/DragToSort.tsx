import React from "react";

import Animated from "react-native-reanimated";
import SortableCard, { CARD_HEIGHT } from "./SortableCard";
import { BlylScreen, BlylView } from "../../../universal-ui";

const { Value } = Animated;
const cards = [
  { id: "1", kind: "six" as const },
  { id: "2", kind: "one" as const },
  { id: "3", kind: "five" as const },
];

export default () => {
  const offsets = cards.map((_, index) => new Value(CARD_HEIGHT * index));
  return (
    <BlylScreen>
      <BlylView containerStyle={{flex: 0, paddingBottom: 16, justifyContent: "center", alignItems: "center"}}>
        {cards.map((card, index) => (
          <SortableCard
            kind={card.kind}
            key={card.id}
            {...{ offsets, card, index }}
          />
        ))}
      </BlylView>
    </BlylScreen>
  );
};
