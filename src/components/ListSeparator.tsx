import React from "react";

import { StyleSheet, View } from "~/components";
import { constants as C } from "~/style";

const S = StyleSheet.create({
  separator: {
    height: C.spacingSmall
  }
});

function ListSeparator({ style, ...props }) {
  return <View style={[S.separator, style]} {...props} />;
}

export { ListSeparator };
