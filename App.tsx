import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ClocksValueAndIdentities,
  Transitions,
  PanGesture,
  DragToSort,
  Decay,
  Spring,
  DynamicSprings,
  Timing,
} from './src/course-examples';
import { UseTransition } from './src/course-examples/useTransition';
import { BlylScreen, BlylContentView, BlylButton } from './src/universal-ui';
import Swipe from './src/course-examples/swiping';
import {
  InstagramPinch,
  PinchWithPanAndSpring,
  PinchWithPan,
} from './src/course-examples/pinchGestures';

function HomeScreen({ navigation }) {
  const screenNames = [
    // { name: "ClockValues" },
    { name: 'Transitions' },
    { name: 'UseTransitions' },
    { name: 'Timing' },
    { name: 'PanGesture' },
    { name: 'Decay' },
    { name: 'Spring' },
    { name: 'Swipe' },
    { name: 'DynamicSprings' },
    { name: 'DragToSort' },
    { name: 'PinchGestures' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <BlylScreen>
        <BlylContentView>
          {screenNames.map(({ name }, index) => (
            <BlylButton
              key={index.toString()}
              title={name}
              kind={index % 2 == 0 ? 'primary' : 'secondary'}
              onPress={() => navigation.navigate(name)}
              buttonStyle={{ marginBottom: 16 }}
            />
          ))}
        </BlylContentView>
      </BlylScreen>
    </View>
  );
}

function ClockValuesScreen() {
  return <ClocksValueAndIdentities />;
}

function TransitionsScreen() {
  return <Transitions />;
}

function UseTransitionsScreen() {
  return <UseTransition />;
}

function PanGestureScreen() {
  return <PanGesture />;
}

function DecayScreen() {
  return <Decay />;
}

function SpringScreen() {
  return <Spring />;
}

function SwipeScreen() {
  return (
    <BlylScreen>
      <Swipe />
    </BlylScreen>
  );
}

function DynamicSpringsScreen() {
  return <DynamicSprings />;
}

function DragToSortScreen() {
  return <DragToSort />;
}

function TimingScreen() {
  return <Timing />;
}

function PinchGesturesScreen({ navigation }) {
  const pinchNames = [
    { name: 'InstagramPinch' },
    { name: 'PinchWithPan' },
    { name: 'PinchWithPanAndSpring' },
  ];
  return (
    <BlylScreen>
      <BlylContentView>
        {pinchNames.map(({ name }, index) => (
          <BlylButton
            key={index.toString()}
            title={name}
            kind={index % 2 == 0 ? 'primary' : 'secondary'}
            onPress={() => navigation.navigate(name)}
            buttonStyle={{ marginBottom: 16 }}
          />
        ))}
      </BlylContentView>
    </BlylScreen>
  );
}

function InstagramPinchScreen() {
  return <InstagramPinch />;
}

function PinchWithPanScreen() {
  return <PinchWithPan />;
}

function PinchWithPanAndSpringScreen() {
  return <PinchWithPanAndSpring />;
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ClockValues" component={ClockValuesScreen} />
        <Stack.Screen name="Transitions" component={TransitionsScreen} />
        <Stack.Screen name="UseTransitions" component={UseTransitionsScreen} />
        <Stack.Screen name="PanGesture" component={PanGestureScreen} />
        <Stack.Screen name="Decay" component={DecayScreen} />
        <Stack.Screen name="Spring" component={SpringScreen} />
        <Stack.Screen name="Swipe" component={SwipeScreen} />
        <Stack.Screen name="DragToSort" component={DragToSortScreen} />
        <Stack.Screen name="DynamicSprings" component={DynamicSprings} />
        <Stack.Screen name="Timing" component={TimingScreen} />
        <Stack.Screen name="PinchGestures" component={PinchGesturesScreen} />
        <Stack.Screen name="InstagramPinch" component={InstagramPinchScreen} />
        <Stack.Screen name="PinchWithPan" component={PinchWithPanScreen} />
        <Stack.Screen
          name="PinchWithPanAndSpring"
          component={PinchWithPanAndSpringScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
