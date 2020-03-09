import React from "react";
import { observer } from "mobx-react";
import { View } from "./View";
import { StyleSheet } from "react-native";
import { shadow } from "~/utils/shadow";
import { IconButton, IconButtonProps } from "./IconButton";
import { constants } from "~/style";

const S = StyleSheet.create({
  container: {
    backgroundColor: constants.colorBackgroundThemeSofter,
    height: 52,
    ...shadow(1),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  icon: {}
});

export const TabBar = observer(() => {
  const icons: { iconName: IconButtonProps["iconName"] }[] = [
    { iconName: "heart" },
    { iconName: "pillar" },
    { iconName: "photo-camera" }
  ];

  return (
    <View style={S.container}>
      {icons.map(context => {
        return (
          <IconButton key={context.iconName} iconName={context.iconName} />
        );
      })}
    </View>
  );
});
