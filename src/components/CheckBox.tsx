import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

import { Icon } from "~/components/Icon";
import { View } from "~/components/View";
import { constants as C } from "~/style";

interface CheckBoxProps {
  size?: number;
  checked: boolean;
  children?: ReactNode;
  contentContainerStyle?: object | undefined;
  onChange?: Function;
}

function CheckBox({
  checked,
  size = 28,
  contentContainerStyle,
  children,
  onChange,
}: CheckBoxProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        onChange(!checked);
      }}
    >
      <View flexDirectionRow alignItemsCenter style={contentContainerStyle}>
        <Icon
          size={size}
          name={checked ? "check-box" : "check-box-blank"}
          color={C.colorBackgroundTheme}
        />
        {children}
      </View>
    </TouchableOpacity>
  );
}

export { CheckBox };
