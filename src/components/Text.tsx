import React, { ReactNode } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

import { constants as C } from "~/style";

interface TextProps extends RNTextProps {
  sizeExtraSmall?: boolean;
  sizeSmall?: boolean;
  sizeMedium?: boolean;
  sizeLarge?: boolean;
  sizeExtraLarge?: boolean;

  colorTheme?: boolean;
  colorAccent?: boolean;
  colorDark?: boolean;
  colorDarkSoft?: boolean;
  colorDarkSofter?: boolean;
  colorLight?: boolean;
  colorLightSoft?: boolean;
  colorLightSofter?: boolean;
  colorDanger?: boolean;

  weightLight?: boolean;
  weightRegular?: boolean;
  weightSemiBold?: boolean;
  weightBold?: boolean;

  alignCenter?: boolean;
  alignLeft?: boolean;
  alignRight?: boolean;
  alignJustify?: boolean;

  children?: ReactNode;
}

export const Text = React.forwardRef<RNText, TextProps>(
  (
    {
      sizeExtraSmall,
      sizeSmall,
      sizeMedium,
      sizeLarge,
      sizeExtraLarge,

      colorTheme,
      colorAccent,
      colorDark,
      colorDarkSoft,
      colorDarkSofter,
      colorLight,
      colorLightSoft,
      colorLightSofter,
      colorDanger,

      weightLight,
      weightRegular,
      weightSemiBold,
      weightBold,

      alignCenter,
      alignLeft,
      alignRight,
      alignJustify,

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

    let color: TextStyle["color"] = C.colorTextLight;
    if (colorTheme) color = C.colorTextTheme;
    else if (colorAccent) color = C.colorTextAccent;
    else if (colorDark) color = C.colorTextDark;
    else if (colorDarkSoft) color = C.colorTextDarkSoft;
    else if (colorDarkSofter) color = C.colorTextDarkSofter;
    else if (colorLight) color = C.colorTextLight;
    else if (colorLightSoft) color = C.colorTextLightSoft;
    else if (colorLightSofter) color = C.colorTextLightSofter;
    else if (colorDanger) color = C.colorTextDanger;

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

    let textAlign: TextStyle["textAlign"] = "auto";
    if (alignCenter) textAlign = "center";
    else if (alignLeft) textAlign = "left";
    else if (alignRight) textAlign = "right";
    else if (alignJustify) textAlign = "justify";

    return (
      <RNText
        ref={ref}
        style={[{ fontFamily, fontSize, color, fontWeight, textAlign }, style]}
        {...props}
      />
    );
  }
);
