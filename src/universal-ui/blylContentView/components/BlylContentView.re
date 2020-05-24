open ReactNative;

// Doesn't work with absoulute elements

[@genType]
[@react.component]
let make = (~children=?, ~containerStyle=?, ~contentContainerStyle=?, ()) => {
  <ScrollView
    showsVerticalScrollIndicator=false
    showsHorizontalScrollIndicator=false
    contentContainerStyle=?contentContainerStyle
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
  </ScrollView>;
};