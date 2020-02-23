import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { constants as C } from "~/style";

export interface IconProps {
  name:
    | "chevron-left"
    | "chevron-right"
    | "notifications"
    | "volume-up"
    | "photo-camera"
    | "pillar"
    | "location-on";

  color?: string;
  size?: number;
}

function Icon({ name, color = C.colorTextLight, size = 28 }: IconProps) {
  switch (name) {
    case "chevron-left":
    case "chevron-right":
    case "notifications":
    case "volume-up":
    case "photo-camera":
    case "location-on":
      return <MaterialIcons name={name} size={size} color={color} />;

    case "pillar":
      return <MaterialCommunityIcons name={name} size={size} color={color} />;

    default:
      console.error(`Icon unsupported name "${name}"`);
      break;
  }

  return null;
}

export { Icon };
