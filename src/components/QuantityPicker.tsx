import React, { memo, useEffect, useMemo, useState, useCallback } from "react";
import { StyleSheet, Animated } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { IconButton } from "~/components/IconButton";
import { constants as C } from "~/style";

const S = StyleSheet.create({
  container: {
    width: "45%",
    aspectRatio: 3,
    borderRadius: 2,
    height: 1,
    // ...shadow(1),
  },
  square: {
    position: "absolute",
    width: "33.3333%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.colorBackgroundAccent,
  },
  noPadding: { padding: 0 },
});

export interface QuantityPickerProps {
  onChange: (value: number) => any;
  value: number;
}
export type QuantityPicker = typeof QuantityPicker;
export const QuantityPicker = memo(
  ({ value, onChange }: QuantityPickerProps) => {
    const handleRemovePress = useCallback(() => {
      if (value === 0) return;
      onChange(Math.max(value - 1, 0));
    }, [onChange, value]);

    const handleAddPress = useCallback(() => {
      onChange(value + 1);
    }, [onChange, value]);

    const [measuredHeight, setMeasuredHeight] = useState<number>(undefined);

    const isZero = value === 0;

    const isZeroAnimated = useMemo(
      () => new Animated.Value(isZero ? 1 : 0),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
    useEffect(() => {
      if (measuredHeight === undefined) return;

      Animated.timing(isZeroAnimated, {
        toValue: isZero ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [isZeroAnimated, isZero, measuredHeight]);

    const style = useMemo(() => {
      if (measuredHeight === undefined) return undefined;

      return {
        left: {
          ...S.square,
          left: 0,
          transform: [
            {
              translateX: isZeroAnimated.interpolate({
                inputRange: [0, 1],
                outputRange: [0, measuredHeight * 2],
              }),
            },
          ],
        },
        middle: {
          ...S.square,
          left: measuredHeight,
          transform: [
            {
              translateX: isZeroAnimated.interpolate({
                inputRange: [0, 1],
                outputRange: [0, measuredHeight],
              }),
            },
          ],
        },
        right: {
          ...S.square,
          left: measuredHeight * 2,
        },
      };
    }, [isZeroAnimated, measuredHeight]);

    const handleContainerLayout = useCallback(
      (event) => {
        if (measuredHeight === undefined) {
          setMeasuredHeight(event.nativeEvent.layout.width / 3);
        }
      },
      [measuredHeight]
    );

    return (
      <TouchableWithoutFeedback hitSlop={C.hitSlop.extraLarge}>
        <View
          style={S.container}
          flexDirectionRow
          onLayout={measuredHeight ? undefined : handleContainerLayout}
        >
          {measuredHeight && (
            <>
              <Animated.View style={style.left}>
                <IconButton
                  iconName="remove"
                  iconSize={20}
                  style={S.noPadding}
                  onPress={handleRemovePress}
                  hitSlop={C.hitSlop.large}
                />
              </Animated.View>

              <Animated.View style={style.middle}>
                <Text>{value}</Text>
              </Animated.View>

              <View style={style.right}>
                <IconButton
                  iconName="add"
                  iconSize={20}
                  style={S.noPadding}
                  onPress={handleAddPress}
                  hitSlop={C.hitSlop.large}
                />
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);
