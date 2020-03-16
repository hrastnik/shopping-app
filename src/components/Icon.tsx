import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { constants as C } from "~/style";

export interface IconProps {
  name:
    | "heart"
    | "heart-outline"
    | "radio-on"
    | "radio-off"
    | "check-box"
    | "check-box-blank"
    | "chevron-left"
    | "chevron-right"
    | "notifications"
    | "volume-up"
    | "photo-camera"
    | "pillar"
    | "location-on"
    | "person"
    | "shopping-cart"
    | "account-edit"
    | "tag"
    | "add"
    | "remove"
    | "logout";

  color?: string;
  size?: number;
}

function Icon({ name, color = C.colorTextLight, size = 28 }: IconProps) {
  switch (name) {
    case "radio-on":
    case "radio-off":
    case "chevron-left":
    case "chevron-right":
    case "notifications":
    case "volume-up":
    case "photo-camera":
    case "location-on":
    case "person":
    case "shopping-cart":
    case "add":
    case "remove":
      return <MaterialIcons name={name} size={size} color={color} />;

    case "pillar":
    case "heart":
    case "heart-outline":
    case "account-edit":
    case "tag":
    case "logout":
      return <MaterialCommunityIcons name={name} size={size} color={color} />;

    default:
      console.error(`Icon unsupported name "${name}"`);
      break;
  }

  return null;
}

export { Icon };
