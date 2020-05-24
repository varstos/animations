import React, { useState, useRef } from "react";
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  ViewStyle,
  View,
} from "react-native";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { BlylCard } from "../../../universal-ui/blylCard";
import { BlylSelection } from "../../../universal-ui/blylSelection";
import { ElevatedContainer, BlylScreen } from "../../../universal-ui";

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const column: Layout = {
  id: "column",
  name: "Column",
  layout: {
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    child: {
      flex: 0,
      width: 250,
      height: height / 4 - 60,
      marginVertical: 10,
    },
  },
};

const row: Layout = {
  id: "row",
  name: "Row",
  layout: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    child: {
      flex: 0,
      width: width / 3 - 10,
      height: 80,
    },
  },
};

const wrap: Layout = {
  id: "wrap",
  name: "Wrap",
  layout: {
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    child: {
      marginVertical: 5,
      marginHorizontal: 5,
      flex: 0,
      width: width / 2 - 10,
      height: height / 7,
    },
  },
};

const cards = [
  { id: "1", kind: "one" as const },
  { id: "2", kind: "two" as const },
  { id: "3", kind: "three" as const },
];

export default () => {
  const transition = (
    <Transition.Change durationMs={400} interpolation="easeInOut" />
  );
  const ref = useRef<TransitioningView>(null);
  const layouts = [column, row, wrap];
  const [currentLayout, setCurrentLayout] = useState(layouts[0].layout);
  return (
    <BlylScreen>
      <Transitioning.View
        style={[styles.container, currentLayout.container]}
        {...{ ref, transition }}
      >
        {cards.map((card) => (
          <BlylCard
            key={card.id}
            kind={card.kind}
            containerStyle={currentLayout.child}
          />
        ))}
      </Transitioning.View>
      <ElevatedContainer>
        {layouts.map((layout) => (
          <BlylSelection
            key={layout.id}
            name={layout.name}
            isActive={layout.layout === currentLayout}
            onSelect={() => {
              if (ref) {
                // @ts-ignore: Object is possibly 'null'.
                ref.current.animateNextTransition();
              }
              setCurrentLayout(layout.layout);
            }}
          />
        ))}
      </ElevatedContainer>
    </BlylScreen>
  );
};
