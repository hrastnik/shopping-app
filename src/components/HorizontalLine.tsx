import React from "react";
import { StyleSheet } from "react-native";

import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { constants as C } from "~/style";

const S = StyleSheet.create({
  divider: {
    height: 0,
    borderWidth: StyleSheet.hairlineWidth,
    width: "100%",
    borderColor: C.colorBackgroundLightDark
  }
});

function HorizontalLine() {
  return (
    <>
      <Spacer small />
      <View style={S.divider} />
      <Spacer small />
    </>
  );
}

export { HorizontalLine };
