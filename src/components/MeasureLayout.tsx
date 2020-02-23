import React, { useState } from "react";
import { View } from "./View";

export function MeasureLayout({ children }) {
  const [dimensions, setDimensions] = useState(undefined);
  const ready =
    dimensions !== undefined &&
    dimensions.width !== 0 &&
    dimensions.height !== 0;

  return (
    <View
      flex
      onLayout={event => {
        setDimensions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height
        });
      }}
    >
      {ready && children(dimensions)}
    </View>
  );
}
