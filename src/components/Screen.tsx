import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";

import { ViewProps, View } from "~/components/View";
import { ScrollViewProps, ScrollView } from "~/components/ScrollView";
import { constants as C } from "~/style";

const S = StyleSheet.create({
  base: { backgroundColor: C.colorBackgroundTheme, flex: 1 },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: C.colorBackgroundTheme
  }
});

interface ScreenCommonProps {
  children?: ReactNode;
  colorBackgroundTheme?: boolean;
  colorBackgroundAccent?: boolean;
  colorBackgroundLight?: boolean;
  colorBackgroundDark?: boolean;
  colorBackgroundDanger?: boolean;
  colorBackgroundThemeSoft?: boolean;
  colorBackgroundThemeSofter?: boolean;
  colorBackgroundThemeHard?: boolean;
  colorBackgroundThemeHarder?: boolean;
  colorBackgroundLightDark?: boolean;
  colorBackgroundLightDarker?: boolean;
  colorBackgroundDarkLight?: boolean;
  colorBackgroundDarkLighter?: boolean;
}

type ScreenProps = { preventScroll?: boolean } & ViewProps &
  ScrollViewProps &
  ScreenCommonProps;

export type Screen = typeof Screen;
export const Screen = React.forwardRef<ScrollView | View, ScreenProps>(
  (
    {
      preventScroll = false,
      colorBackgroundTheme,
      colorBackgroundAccent,
      colorBackgroundLight,
      colorBackgroundDark,
      colorBackgroundDanger,
      colorBackgroundThemeSoft,
      colorBackgroundThemeSofter,
      colorBackgroundThemeHard,
      colorBackgroundThemeHarder,
      colorBackgroundLightDark,
      colorBackgroundLightDarker,
      colorBackgroundDarkLight,
      colorBackgroundDarkLighter,
      style,
      ...props
    },
    ref
  ) => {
    const screenStyle = [S.base, style];

    const resolveBackgroundColor = () => {
      if (colorBackgroundTheme) return C.colorBackgroundTheme;
      if (colorBackgroundAccent) return C.colorBackgroundAccent;
      if (colorBackgroundLight) return C.colorBackgroundLight;
      if (colorBackgroundDark) return C.colorBackgroundDark;
      if (colorBackgroundDanger) return C.colorBackgroundDanger;
      if (colorBackgroundThemeSoft) return C.colorBackgroundThemeSoft;
      if (colorBackgroundThemeSofter) return C.colorBackgroundThemeSofter;
      if (colorBackgroundThemeHard) return C.colorBackgroundThemeHard;
      if (colorBackgroundThemeHarder) return C.colorBackgroundThemeHarder;
      if (colorBackgroundLightDark) return C.colorBackgroundLightDark;
      if (colorBackgroundLightDarker) return C.colorBackgroundLightDarker;
      if (colorBackgroundDarkLight) return C.colorBackgroundDarkLight;
      if (colorBackgroundDarkLighter) return C.colorBackgroundDarkLighter;
      return C.colorBackgroundThemeHard;
    };

    const backgroundColor = resolveBackgroundColor();

    if (preventScroll === true)
      return (
        <View ref={ref} style={[screenStyle, { backgroundColor }]} {...props} />
      );

    return (
      <ScrollView
        ref={ref}
        style={[screenStyle, { backgroundColor }]}
        contentContainerStyle={[S.contentContainer, { backgroundColor }]}
        keyboardShouldPersistTaps="handled"
        {...props}
      />
    );
  }
);
