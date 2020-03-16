import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

import { constants as C } from "~/style";

const Spinner = React.forwardRef<ActivityIndicator, ActivityIndicatorProps>(
  (
    {
      size = "large",
      color = C.colorTextAccent,
      ...props
    }: ActivityIndicatorProps,
    ref
  ) => {
    return <ActivityIndicator ref={ref} size={size} color={color} {...props} />;
  }
);

export { Spinner };
