open ReactNative;
// To speed up the initial render, you can import initialWindowSafeAreaInsets
// from this package and set as the initialSafeAreaInsets prop on the provider as
// described in Web SSR. You cannot do this if your provider remounts, or you are
// using react-native-navigation
[@genType]
[@react.component]
let make = (~children=?, ()) => {
  let insets = ReactNativeSafeAreaContext.useSafeArea();
  <View
    style=Style.(
      viewStyle(
        ~flex=1.,
        ~backgroundColor="#e6e6e6",
        ~paddingTop=insets##top->dp,
        ~paddingBottom=insets##bottom->dp,
        ~justifyContent=`spaceBetween,
        (),
      )
    )>
    {switch (children) {
     | Some(c) => c
     | None => React.null
     }}
  </View>;
};