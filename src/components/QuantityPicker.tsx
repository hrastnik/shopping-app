import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { IconButton } from "~/components/IconButton";
import { constants as C } from "~/style";
import { shadow } from "~/utils/shadow";

const S = StyleSheet.create({
  container: {
    width: "45%",
    aspectRatio: 3,
    borderRadius: 2,
    backgroundColor: C.colorBackgroundAccent,
    ...shadow(1)
  },
  noPadding: { padding: 0 }
});

export interface QuantityPickerProps {
  onChange: (value: number) => any;
  value: number;
}

export type QuantityPicker = typeof QuantityPicker;
export const QuantityPicker = memo((props: QuantityPickerProps) => {
  const handleRemovePress = () => {
    if (props.value === 0) return;
    props.onChange(Math.max(props.value - 1, 0));
  };

  const handleAddPress = () => {
    props.onChange(props.value + 1);
  };

  return (
    <TouchableWithoutFeedback hitSlop={C.hitSlop.extraLarge}>
      <View style={S.container} flexDirectionRow>
        <View flex centerContent>
          <IconButton
            iconName="remove"
            iconSize={20}
            style={S.noPadding}
            onPress={handleRemovePress}
            hitSlop={C.hitSlop.large}
          />
        </View>
        <View flex centerContent>
          <Text>{props.value}</Text>
        </View>
        <View flex centerContent>
          <IconButton
            iconName="add"
            iconSize={20}
            style={S.noPadding}
            onPress={handleAddPress}
            hitSlop={C.hitSlop.large}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});
