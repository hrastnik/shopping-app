import React, { useState } from "react";
import { View } from "./View";

interface MeasureLayoutProps {
  children: (dimensions: { width: number; height: number }) => React.ReactNode;
}

export function MeasureLayout({ children }: MeasureLayoutProps) {
  const [dimensions, setDimensions] = useState(undefined);
  const ready =
    dimensions !== undefined &&
    dimensions.width !== 0 &&
    dimensions.height !== 0;

  return (
    <View
      flex
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setDimensions({ width, height });
      }}
    >
      {ready && children(dimensions)}
    </View>
  );
}
