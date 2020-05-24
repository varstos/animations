open ReactNative;

type select = {
  id: string,
  name: string,
  isActive: bool,
};

[@genType]
[@react.component]
let make = (~name, ~isActive, ~onSelect) => {
  <BlylView containerStyle={Style.viewStyle(~alignItems=`center, ())}>
    <TouchableOpacity
      style=Style.(
        viewStyle(
          ~flexDirection=`row,
          ~width=200.->dp,
          ~justifyContent=`spaceBetween,
          (),
        )
      )
      onPress={_ => onSelect(name)}>
      <Text style=Style.(textStyle(~fontSize=20., ()))>
        name->React.string
      </Text>
      {isActive
         ? <View style=Style.(viewStyle(~borderRadius=25., ()))>
             <Image
               source={Image.Source.fromRequired(
                 Packager.require("../../../../assets/icons/doneIcon.png"),
               )}
               style=Style.(
                 array([|
                   viewStyle(~width=25.->dp, ~height=25.->dp, ()),
                   imageStyle(~resizeMode=`contain, ()),
                 |])
               )
             />
           </View>
         : React.null}
    </TouchableOpacity>
  </BlylView>;
};