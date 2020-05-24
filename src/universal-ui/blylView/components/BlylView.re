open ReactNative;

[@genType]
[@react.component]
let make = (~children=?, ~containerStyle=?, ()) => {
  <View
    style=Style.(
      arrayOption([|
        Some(viewStyle(~paddingHorizontal=16.->dp, ())),
        containerStyle,
      |])
    )>
    {switch (children) {
     | Some(c) => c
     | None => React.null
     }}
  </View>;
};