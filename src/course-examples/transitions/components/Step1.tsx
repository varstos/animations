import React from "react";
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  ViewStyle,
  View,
} from "react-native";
import { BlylCard } from "../../../universal-ui/blylCard";
interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}

const { width } = Dimensions.get("window");

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
      width: 380,
      height: 180,
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
      flex: 0,
      width: width / 2 - 20,
    },
  },
};
const cards = [
  { id: "1", kind: "one" as const },
  { id: "2", kind: "two" as const },
  { id: "3", kind: "three" as const },
];

const currentLayout = wrap.layout;

export default () => {
  return (
    <View style={{ paddingVertical: 30, flex:1 }}>
      <View style={[styles.container, currentLayout.container]}>
        {cards.map((card) => (
          <BlylCard
            key={card.id}
            kind={card.kind}
            containerStyle={currentLayout.child}
          />
        ))}
      </View>
    </View>
  );
};
