import React, { ReactNode } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  StyleSheet,
  Platform,
} from "react-native";

import { constants as C } from "~/style";

const S = StyleSheet.create({
  baseStyle: {
    margin: 0,
    backgroundColor: C.colorBackgroundLightDark,
  },
});

export interface TextInputProps extends RNTextInputProps {
  sizeExtraSmall?: boolean;
  sizeSmall?: boolean;
  sizeMedium?: boolean;
  sizeLarge?: boolean;
  sizeExtraLarge?: boolean;

  colorTheme?: boolean;
  colorDark?: boolean;
  colorDarkSoft?: boolean;
  colorDarkSofter?: boolean;
  colorLight?: boolean;
  colorLightSoft?: boolean;
  colorLightSofter?: boolean;

  weightLight?: boolean;
  weightRegular?: boolean;
  weightSemiBold?: boolean;
  weightBold?: boolean;
  children?: ReactNode;
}

export type TextInput = typeof TextInput;
export const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  (
    {
      sizeExtraSmall,
      sizeSmall,
      sizeMedium,
      sizeLarge,
      sizeExtraLarge,

      colorTheme,
      colorDark,
      colorDarkSoft,
      colorDarkSofter,
      colorLight,
      colorLightSoft,
      colorLightSofter,

      weightLight,
      weightRegular,
      weightSemiBold,
      weightBold,

      style,
      ...props
    },
    ref
  ) => {
    let fontSize: TextStyle["fontSize"] = C.fontSizeMedium;
    if (sizeExtraSmall) fontSize = C.fontSizeExtraSmall;
    else if (sizeSmall) fontSize = C.fontSizeSmall;
    else if (sizeMedium) fontSize = C.fontSizeMedium;
    else if (sizeLarge) fontSize = C.fontSizeLarge;
    else if (sizeExtraLarge) fontSize = C.fontSizeExtraLarge;

    let borderRadius: TextStyle["borderRadius"] = 8;
    if (sizeExtraSmall) borderRadius = 4;
    else if (sizeSmall) borderRadius = 4;

    let color: TextStyle["color"] = C.colorTextDark;
    if (colorTheme) color = C.colorTextTheme;
    else if (colorDark) color = C.colorTextDark;
    else if (colorDarkSoft) color = C.colorTextDarkSoft;
    else if (colorDarkSofter) color = C.colorTextDarkSofter;
    else if (colorLight) color = C.colorTextLight;
    else if (colorLightSoft) color = C.colorTextLightSoft;
    else if (colorLightSofter) color = C.colorTextLightSofter;

    let fontWeight: TextStyle["fontWeight"] = C.fontWeightRegular;
    let fontFamily: TextStyle["fontFamily"] = "SignikaNegative-Regular";
    if (weightLight) {
      fontWeight = C.fontWeightLight;
      fontFamily = "SignikaNegative-Light";
    } else if (weightRegular) {
      fontWeight = C.fontWeightRegular;
      fontFamily = "SignikaNegative-Regular";
    } else if (weightSemiBold) {
      fontWeight = C.fontWeightSemiBold;
      fontFamily = "SignikaNegative-SemiBold";
    } else if (weightBold) {
      fontWeight = C.fontWeightBold;
      fontFamily = "SignikaNegative-Bold";
    }

    return (
      <RNTextInput
        ref={ref}
        selectionColor={C.colorBackgroundThemeSofter}
        style={[
          S.baseStyle,
          { textAlignVertical: "top" },
          Platform.select({
            ios: sizeSmall
              ? {
                  lineHeight: 17,
                  paddingTop: 2,
                  paddingBottom: 6,
                  paddingHorizontal: C.spacingSmall,
                }
              : {
                  lineHeight: 20,
                  paddingTop: 9,
                  paddingBottom: 9,
                  paddingHorizontal: C.spacingMedium,
                },
            android: sizeSmall
              ? {
                  paddingHorizontal: C.spacingSmall,
                  lineHeight: 24,
                  textAlignVertical: "center",
                  paddingBottom: 0,
                  margin: 0,
                  marginTop: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                  maxHeight: 24,
                }
              : {
                  lineHeight: 20,
                  paddingTop: 9,
                  paddingBottom: 0,
                  paddingHorizontal: C.spacingMedium,
                },
          }),
          {
            borderRadius,
            fontSize,
            color,
            fontWeight,
            fontFamily,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);
