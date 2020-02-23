import React from "react";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react";
import MapView from "react-native-maps";

import { Screen } from "~/components/Screen";

const S = StyleSheet.create({
  map: { flex: 1 }
});

export const MapScreen = observer(() => {
  return (
    <Screen preventScroll>
      <MapView style={S.map} />
    </Screen>
  );
});
