import React, { ReactNode } from "react";
import { StyleSheet, ScrollView as RNScrollView } from "react-native";

import { ViewProps, View } from "~/components/View";
import { ScrollViewProps, ScrollView } from "~/components/ScrollView";
import { constants as C } from "~/style";

const S = StyleSheet.create({
  base: { backgroundColor: C.colorBackgroundTheme, flex: 1 },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: C.colorBackgroundTheme,
  },
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

export type ScreenProps = ScreenCommonProps & ScrollViewProps;
export type Screen = typeof Screen;
export const Screen = React.forwardRef<RNScrollView, ScreenProps>(
  (
    {
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
    const backgroundColor = colorBackgroundTheme
      ? C.colorBackgroundTheme
      : colorBackgroundAccent
      ? C.colorBackgroundAccent
      : colorBackgroundLight
      ? C.colorBackgroundLight
      : colorBackgroundDark
      ? C.colorBackgroundDark
      : colorBackgroundDanger
      ? C.colorBackgroundDanger
      : colorBackgroundThemeSoft
      ? C.colorBackgroundThemeSoft
      : colorBackgroundThemeSofter
      ? C.colorBackgroundThemeSofter
      : colorBackgroundThemeHard
      ? C.colorBackgroundThemeHard
      : colorBackgroundThemeHarder
      ? C.colorBackgroundThemeHarder
      : colorBackgroundLightDark
      ? C.colorBackgroundLightDark
      : colorBackgroundLightDarker
      ? C.colorBackgroundLightDarker
      : colorBackgroundDarkLight
      ? C.colorBackgroundDarkLight
      : colorBackgroundDarkLighter
      ? C.colorBackgroundDarkLighter
      : C.colorBackgroundThemeHard;

    return (
      <ScrollView
        ref={ref}
        style={[S.base, { backgroundColor }, style]}
        contentContainerStyle={[S.contentContainer, { backgroundColor }]}
        keyboardShouldPersistTaps="handled"
        {...props}
      />
    );
  }
);

export type ScreenNoScrollProps = ScreenCommonProps & ViewProps;
export type ScreenNoScroll = typeof ScreenNoScroll;
export const ScreenNoScroll = React.forwardRef<View, ScreenNoScrollProps>(
  (
    {
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
    const backgroundColor = colorBackgroundTheme
      ? C.colorBackgroundTheme
      : colorBackgroundAccent
      ? C.colorBackgroundAccent
      : colorBackgroundLight
      ? C.colorBackgroundLight
      : colorBackgroundDark
      ? C.colorBackgroundDark
      : colorBackgroundDanger
      ? C.colorBackgroundDanger
      : colorBackgroundThemeSoft
      ? C.colorBackgroundThemeSoft
      : colorBackgroundThemeSofter
      ? C.colorBackgroundThemeSofter
      : colorBackgroundThemeHard
      ? C.colorBackgroundThemeHard
      : colorBackgroundThemeHarder
      ? C.colorBackgroundThemeHarder
      : colorBackgroundLightDark
      ? C.colorBackgroundLightDark
      : colorBackgroundLightDarker
      ? C.colorBackgroundLightDarker
      : colorBackgroundDarkLight
      ? C.colorBackgroundDarkLight
      : colorBackgroundDarkLighter
      ? C.colorBackgroundDarkLighter
      : C.colorBackgroundThemeHard;

    return (
      <View ref={ref} style={[S.base, { backgroundColor }, style]} {...props} />
    );
  }
);
