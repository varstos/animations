open ReactNative;

type buttonType = [ | `primary | `secondary];

[@genType]
[@react.component]
let make =
    (
      ~kind: buttonType=`primary,
      ~title,
      ~onPress,
      ~buttonStyle=?,
      ~titleStyle=?,
    ) => {
  <TouchableHighlight
    onPress={_ => onPress()}
    style=Style.(
      arrayOption([|
        Some(
          viewStyle(
            ~borderWidth=5.,
            ~alignItems=`center,
            ~paddingHorizontal=22.->dp,
            ~paddingVertical=10.->dp,
            (),
          ),
        ),
        {
          switch (kind) {
          | `primary =>
            Some(
              viewStyle(
                ~backgroundColor="#ffd633",
                ~borderColor="#1a1400",
                (),
              ),
            )
          | `secondary =>
            Some(
              viewStyle(
                ~backgroundColor="#1a1400",
                ~borderColor="#ffd633",
                (),
              ),
            )
          };
        },
        buttonStyle,
      |])
    )>
    <Text
      style=Style.(
        arrayOption([|
          Some(textStyle(~fontWeight=`bold, ~fontSize=16., ())),
          {
            switch (kind) {
            | `primary => Some(textStyle(~color="#1a1400", ()))
            | `secondary => Some(textStyle(~color="#ffd633", ()))
            };
          },
          titleStyle,
        |])
      )>
      title->React.string
    </Text>
  </TouchableHighlight>;
};