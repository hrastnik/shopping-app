import React from "react";
import { ViewStyle } from "react-native";

import { Text } from "~/components/Text";
import { IconProps, Icon } from "~/components/Icon";
import { View } from "~/components/View";
import { constants as C } from "~/style";

interface IconWithBadgeProps extends IconProps {
  count?: number;
  shouldShowBadge: boolean;
}

export function IconWithBadge({
  size = 28,
  color = C.colorTextLight,
  name,
  shouldShowBadge,
  count,
}: IconWithBadgeProps) {
  const badgeSize = size * 0.4;
  const badgeRadius = badgeSize * 0.5;
  const badgeStyle: ViewStyle = {
    position: "absolute",
    width: badgeSize,
    height: badgeSize,
    backgroundColor: C.colorTextDanger,
    borderRadius: badgeRadius,
    right: size * 0.1,
    top: size * 0.1,
  };

  const shouldShowCount = typeof count === "string" && count !== "";

  return (
    <View>
      <Icon size={size} color={color} name={name} />
      {shouldShowBadge && (
        <View centerContent style={badgeStyle}>
          {shouldShowCount && (
            <Text colorLight weightBold sizeExtraSmall>
              {count}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
