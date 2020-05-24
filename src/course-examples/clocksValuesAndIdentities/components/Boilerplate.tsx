import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  component: {
    height: 100,
    width: 150,
  },
  button: {
    marginTop: 20,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  }
});

export default () => {
  const [show, setShow] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{ opacity: show ? 1 : 0 }}>
          <View>
            <View style={[{backgroundColor: "black"}, styles.component]} />
            <View style={[{backgroundColor: "orange"}, styles.component]}/>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setShow((prev) => !prev)}>
          <Text style={styles.buttonText}>{show ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
