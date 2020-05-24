import React from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ActivityIndicatorProps,
  AlertButton,
  AlertOptions,
  AccessibilityStates,
  AccessibilityTrait,
  View,
  GestureResponderEvent,
  Image,
  NativeSyntheticEvent,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageProgressEventDataIOS,
  Platform,
  ModalProps,
  Dimensions,
  ScaledSize,
} from "react-native";
// tslint:disable max-classes-per-file
export type Event_layoutEvent = LayoutChangeEvent;

export type Style_t = StyleProp<ViewStyle | TextStyle | ImageStyle>;

export type ActivityIndicator_Size_t = ActivityIndicatorProps["size"];

export type Alert_button = AlertButton;
export type Alert_options = AlertOptions;

export type View_edgeInsets = View["props"]["hitSlop"];

export type AccessibilityState_t = AccessibilityStates;

export type AccessibilityTrait_t = AccessibilityTrait;

export type Color_t = string;

export type Platform_os = typeof Platform.OS;

export type Event_pressEvent = GestureResponderEvent;

export type Image_DefaultSource_t = Image["props"]["defaultSource"];

export type Image_Source_t = Image["props"]["source"];

export type Image_errorEvent = NativeSyntheticEvent<ImageErrorEventData>;

export type Image_imageLoadEvent = NativeSyntheticEvent<ImageLoadEventData>;

export type Image_progressEvent = NativeSyntheticEvent<
  ImageProgressEventDataIOS
>;

export type Modal_Orientation_t = NonNullable<
  ModalProps["supportedOrientations"]
>[number];

export type Dimensions_displayMetrics = ScaledSize;

export type View_ref = React.Ref<View>;

export abstract class Event_targetEvent {
  protected opaque: unknown;
}

export abstract class TextInput_DataDetectorTypes_t {
  protected opaque: unknown;
}

export abstract class TextInput_changeEvent {
  protected opaque: unknown;
}

export abstract class TextInput_contentSizeChangeEvent {
  protected opaque: unknown;
}

export abstract class TextInput_editingEvent {
  protected opaque: unknown;
}

export abstract class TextInput_keyPressEvent {
  protected opaque: unknown;
}

export abstract class TextInput_scrollEvent {
  protected opaque: unknown;
}
export abstract class TextInput_selectionChangeEvent {
  protected opaque: unknown;
}
export abstract class TextInput_selection {
  protected opaque: unknown;
}
export abstract class TextInput_textInputEvent {
  protected opaque: unknown;
}
