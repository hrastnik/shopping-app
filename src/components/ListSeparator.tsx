import React from "react";
import { StyleSheet } from "react-native";

import { View } from "~/components/View";
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
