import React, { ReactNode } from "react";
import {
  View as RNView,
  ViewStyle,
  ViewProps as RNViewProps
} from "react-native";

import { constants as C } from "~/style";

export interface ViewProps extends RNViewProps {
  aspectRatioOne?: boolean;

  paddingSmall?: boolean;
  paddingMedium?: boolean;
  paddingLarge?: boolean;
  paddingExtraLarge?: boolean;
  paddingHorizontalSmall?: boolean;
  paddingHorizontalMedium?: boolean;
  paddingHorizontalLarge?: boolean;
  paddingHorizontalExtraLarge?: boolean;
  paddingVerticalSmall?: boolean;
  paddingVerticalMedium?: boolean;
  paddingVerticalLarge?: boolean;
  paddingVerticalExtraLarge?: boolean;
  centerContent?: boolean;
  justifyContentCenter?: boolean;
  alignItemsCenter?: boolean;
  flex?: boolean;
  flexDirectionRow?: boolean;
  flexDirectionColumn?: boolean;
  flexDirectionRowReverse?: boolean;
  flexDirectionColumnReverse?: boolean;

  absoluteTopLeftSmall?: boolean;
  absoluteTopLeftMedium?: boolean;
  absoluteTopLeftLarge?: boolean;
  absoluteTopLeftExtraLarge?: boolean;

  absoluteTopRightSmall?: boolean;
  absoluteTopRightMedium?: boolean;
  absoluteTopRightLarge?: boolean;
  absoluteTopRightExtraLarge?: boolean;

  absoluteBottomLeftSmall?: boolean;
  absoluteBottomLeftMedium?: boolean;
  absoluteBottomLeftLarge?: boolean;
  absoluteBottomLeftExtraLarge?: boolean;

  absoluteBottomRightSmall?: boolean;
  absoluteBottomRightMedium?: boolean;
  absoluteBottomRightLarge?: boolean;
  absoluteBottomRightExtraLarge?: boolean;

  children?: ReactNode;
}

export const View = React.forwardRef<RNView, ViewProps>(
  (
    {
      aspectRatioOne,
      paddingSmall,
      paddingMedium,
      paddingLarge,
      paddingExtraLarge,
      paddingHorizontalSmall,
      paddingHorizontalMedium,
      paddingHorizontalLarge,
      paddingHorizontalExtraLarge,
      paddingVerticalSmall,
      paddingVerticalMedium,
      paddingVerticalLarge,
      paddingVerticalExtraLarge,
      centerContent,
      justifyContentCenter,
      alignItemsCenter,
      flex,
      style,
      flexDirectionRow,
      flexDirectionColumn,
      flexDirectionRowReverse,
      flexDirectionColumnReverse,

      absoluteTopLeftSmall,
      absoluteTopLeftMedium,
      absoluteTopLeftLarge,
      absoluteTopLeftExtraLarge,
      absoluteTopRightSmall,
      absoluteTopRightMedium,
      absoluteTopRightLarge,
      absoluteTopRightExtraLarge,
      absoluteBottomLeftSmall,
      absoluteBottomLeftMedium,
      absoluteBottomLeftLarge,
      absoluteBottomLeftExtraLarge,
      absoluteBottomRightSmall,
      absoluteBottomRightMedium,
      absoluteBottomRightLarge,
      absoluteBottomRightExtraLarge,

      ...props
    },
    ref
  ) => {
    let padding: ViewStyle["padding"];
    if (paddingSmall) padding = C.spacingSmall;
    if (paddingMedium) padding = C.spacingMedium;
    if (paddingLarge) padding = C.spacingLarge;
    if (paddingExtraLarge) padding = C.spacingExtraLarge;

    let paddingHorizontal: ViewStyle["paddingHorizontal"];
    if (paddingHorizontalSmall) paddingHorizontal = C.spacingSmall;
    if (paddingHorizontalMedium) paddingHorizontal = C.spacingMedium;
    if (paddingHorizontalLarge) paddingHorizontal = C.spacingLarge;
    if (paddingHorizontalExtraLarge) paddingHorizontal = C.spacingExtraLarge;

    let paddingVertical: ViewStyle["paddingVertical"];
    if (paddingVerticalSmall) paddingVertical = C.spacingSmall;
    if (paddingVerticalMedium) paddingVertical = C.spacingMedium;
    if (paddingVerticalLarge) paddingVertical = C.spacingLarge;
    if (paddingVerticalExtraLarge) paddingVertical = C.spacingExtraLarge;

    let justifyContent: ViewStyle["justifyContent"];
    let alignItems: ViewStyle["alignItems"];
    if (centerContent) {
      justifyContent = "center";
      alignItems = "center";
    }
    if (justifyContentCenter) justifyContent = "center";
    if (alignItemsCenter) alignItems = "center";

    let flexDirection: ViewStyle["flexDirection"] = "column";
    if (flexDirectionRow) flexDirection = "row";
    if (flexDirectionColumn) flexDirection = "column";
    if (flexDirectionRowReverse) flexDirection = "row-reverse";
    if (flexDirectionColumnReverse) flexDirection = "column-reverse";

    let position: ViewStyle["position"];
    let top: ViewStyle["top"];
    let left: ViewStyle["left"];
    let right: ViewStyle["right"];
    let bottom: ViewStyle["bottom"];
    if (absoluteTopLeftSmall) {
      position = "absolute";
      top = C.spacingSmall;
      left = C.spacingSmall;
    }
    if (absoluteTopLeftMedium) {
      position = "absolute";
      top = C.spacingMedium;
      left = C.spacingMedium;
    }
    if (absoluteTopLeftLarge) {
      position = "absolute";
      top = C.spacingLarge;
      left = C.spacingLarge;
    }
    if (absoluteTopLeftExtraLarge) {
      position = "absolute";
      top = C.spacingExtraLarge;
      left = C.spacingExtraLarge;
    }
    if (absoluteTopRightSmall) {
      position = "absolute";
      top = C.spacingSmall;
      right = C.spacingSmall;
    }
    if (absoluteTopRightMedium) {
      position = "absolute";
      top = C.spacingMedium;
      right = C.spacingMedium;
    }
    if (absoluteTopRightLarge) {
      position = "absolute";
      top = C.spacingLarge;
      right = C.spacingLarge;
    }
    if (absoluteTopRightExtraLarge) {
      position = "absolute";
      top = C.spacingExtraLarge;
      right = C.spacingExtraLarge;
    }
    if (absoluteBottomLeftSmall) {
      position = "absolute";
      bottom = C.spacingSmall;
      left = C.spacingSmall;
    }
    if (absoluteBottomLeftMedium) {
      position = "absolute";
      bottom = C.spacingMedium;
      left = C.spacingMedium;
    }
    if (absoluteBottomLeftLarge) {
      position = "absolute";
      bottom = C.spacingLarge;
      left = C.spacingLarge;
    }
    if (absoluteBottomLeftExtraLarge) {
      position = "absolute";
      bottom = C.spacingExtraLarge;
      left = C.spacingExtraLarge;
    }
    if (absoluteBottomRightSmall) {
      position = "absolute";
      bottom = C.spacingSmall;
      right = C.spacingSmall;
    }
    if (absoluteBottomRightMedium) {
      position = "absolute";
      bottom = C.spacingMedium;
      right = C.spacingMedium;
    }
    if (absoluteBottomRightLarge) {
      position = "absolute";
      bottom = C.spacingLarge;
      right = C.spacingLarge;
    }
    if (absoluteBottomRightExtraLarge) {
      position = "absolute";
      bottom = C.spacingExtraLarge;
      right = C.spacingExtraLarge;
    }

    let _flex: ViewStyle["flex"];
    if (flex) _flex = 1;

    let aspectRatio: ViewStyle["aspectRatio"];
    if (aspectRatioOne) {
      aspectRatio = 1;
    }

    return (
      <RNView
        ref={ref}
        style={[
          {
            aspectRatio,

            position,
            top,
            left,
            right,
            bottom,

            paddingHorizontal,
            paddingVertical,
            padding,
            justifyContent,
            alignItems,
            flexDirection,
            flex: _flex
          },
          style
        ]}
        {...props}
      />
    );
  }
);
