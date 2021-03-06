import React from "react";
import { Icon, IconProps } from "~/components/Icon";
import { Button, ButtonProps } from "~/components/Button";

import { constants as C } from "~/style";

export interface IconButtonProps extends ButtonProps {
  iconName: IconProps["name"];
  iconSize?: IconProps["size"];
  iconColor?: IconProps["color"];
}

function IconButton({
  iconName,
  iconSize,
  iconColor,

  ...props
}: IconButtonProps) {
  return (
    <Button hitSlop={C.hitSlop.medium} blockUi={false} transparent {...props}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </Button>
  );
}

export { IconButton };
