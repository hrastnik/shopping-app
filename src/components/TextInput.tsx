import React, { ReactNode } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  StyleSheet
} from "react-native";

import { constants as C } from "~/style";

const S = StyleSheet.create({
  baseStyle: {
    padding: C.spacingMedium,
    margin: 0,
    minHeight: 48,
    backgroundColor: C.colorBackgroundLightDark,
    borderRadius: 10
  }
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
  weightExtraBold?: boolean;
  children?: ReactNode;
}

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
      weightExtraBold,

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

    let color: TextStyle["color"] = C.colorTextDark;
    if (colorTheme) color = C.colorTextTheme;
    else if (colorDark) color = C.colorTextDark;
    else if (colorDarkSoft) color = C.colorTextDarkSoft;
    else if (colorDarkSofter) color = C.colorTextDarkSofter;
    else if (colorLight) color = C.colorTextLight;
    else if (colorLightSoft) color = C.colorTextLightSoft;
    else if (colorLightSofter) color = C.colorTextLightSofter;

    let fontWeight: TextStyle["fontWeight"] = C.fontWeightRegular;
    // let fontFamily: TextStyle["fontFamily"] = "OpenSans-Regular";
    if (weightLight) {
      fontWeight = C.fontWeightLight;
      // fontFamily = "OpenSans-Light";
    } else if (weightRegular) {
      fontWeight = C.fontWeightRegular;
      // fontFamily = "OpenSans-Regular";
    } else if (weightSemiBold) {
      fontWeight = C.fontWeightSemiBold;
      // fontFamily = "OpenSans-SemiBold";
    } else if (weightBold) {
      fontWeight = C.fontWeightBold;
      // fontFamily = "OpenSans-Bold";
    } else if (weightExtraBold) {
      fontWeight = C.fontWeightExtraBold;
      // fontFamily = "OpenSans-ExtraBold";
    }
    return (
      <RNTextInput
        ref={ref}
        selectionColor={C.colorBackgroundThemeSofter}
        style={[
          S.baseStyle,
          {
            fontSize,
            color,
            fontWeight
          },
          style
        ]}
        {...props}
      />
    );
  }
);
