import React from "react";

import { constants as C } from "~/style";
import { StyleSheet, View, Spacer } from "~/components";

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
