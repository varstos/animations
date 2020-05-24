open ReactNative;

[@genType]
[@react.component]
let make = (~children=?, ~containerStyle=?) => {
  <View
    style=Style.(
      arrayOption([|
        Some(
          viewStyle(
            ~width=100.->pct,
            ~padding=16.->dp,
            ~backgroundColor="#cccccc",
            ~shadowColor="rgba(0,0,0, .1)",
            ~shadowOffset=offset(~height=-0.5, ~width=0.),
            ~shadowOpacity=1.,
            ~shadowRadius=1.,
            ~elevation=10.,
            (),
          ),
        ),
        containerStyle,
      |])
    )>
    {switch (children) {
     | Some(c) => c
     | None => React.null
     }}
  </View>;
};