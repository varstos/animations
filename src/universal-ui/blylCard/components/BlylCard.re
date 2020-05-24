open ReactNative;

type imageUri = {
  one: string,
  two: string,
  three: string,
  four: string,
  five: string,
  six: string,
  seven: string,
  eight: string,
  nine: string,
  ten: string,
};

type size = {
  height: float,
  width: float,
};

let defaultSize = {height: 180., width: 380.};

let imageDefault = {
  one: "https://i.ibb.co/GnWSjJC/one.png",
  two: "https://i.ibb.co/QC4Sd1F/two.png",
  three: "https://i.ibb.co/j6pL78D/three.png",
  four: "https://i.ibb.co/k2ySvNd/four.png",
  five: "https://i.ibb.co/g91m3Vm/five.png",
  six: "https://i.ibb.co/pWdjZb5/six.png",
  seven: "https://i.ibb.co/fpTLyLc/seven.png",
  eight: "https://i.ibb.co/yNK3mWm/eight.png",
  nine: "https://i.ibb.co/hy8MYrb/nine.png",
  ten: "https://i.ibb.co/RvbtnPk/ten.png",
};

[@genType]
[@react.component]
let make = (~kind, ~containerSize: size=defaultSize, ~containerStyle=?) => {
  <View>
    <Image
      source=Image.(
        Source.fromUriSource(
          uriSource(
            ~uri={
              switch (kind) {
              | `one => imageDefault.one
              | `two => imageDefault.two
              | `three => imageDefault.three
              | `four => imageDefault.four
              | `five => imageDefault.five
              | `six => imageDefault.six
              | `seven => imageDefault.seven
              | `eight => imageDefault.eight
              | `nine => imageDefault.nine
              | `ten => imageDefault.ten
              };
            },
            (),
          ),
        )
      )
      style=Style.(
        arrayOption([|
          Some(
            viewStyle(
              ~height=containerSize.height->dp,
              ~width=containerSize.width->dp,
              (),
            ),
          ),
          containerStyle,
          Some(imageStyle(~resizeMode=`stretch, ())),
        |])
      )
    />
  </View>;
};