import React, { ReactNode } from "react";
import {
  View as RNView,
  StyleSheet,
  ScrollView,
  ScrollViewProps
} from "react-native";
import { ViewProps, View } from "~/components/View";

import { constants as C } from "~/style";

const S = StyleSheet.create({
  base: { backgroundColor: C.colorBackgroundTheme, flex: 1 },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: C.colorBackgroundTheme
  }
});

interface ScreenProps extends ScrollViewProps, ViewProps {
  preventScroll?: boolean;
  children: ReactNode;
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

const Screen = React.forwardRef<ScrollView & RNView, ScreenProps>(
  function _Screen({ preventScroll = false, style, ...props }, ref) {
    const screenStyle = [S.base, style];

    const resolveBackgroundColor = () => {
      if (props.colorBackgroundTheme) return C.colorBackgroundTheme;
      if (props.colorBackgroundAccent) return C.colorBackgroundAccent;
      if (props.colorBackgroundLight) return C.colorBackgroundLight;
      if (props.colorBackgroundDark) return C.colorBackgroundDark;
      if (props.colorBackgroundDanger) return C.colorBackgroundDanger;
      if (props.colorBackgroundThemeSoft) return C.colorBackgroundThemeSoft;
      if (props.colorBackgroundThemeSofter) return C.colorBackgroundThemeSofter;
      if (props.colorBackgroundThemeHard) return C.colorBackgroundThemeHard;
      if (props.colorBackgroundThemeHarder) return C.colorBackgroundThemeHarder;
      if (props.colorBackgroundLightDark) return C.colorBackgroundLightDark;
      if (props.colorBackgroundLightDarker) return C.colorBackgroundLightDarker;
      if (props.colorBackgroundDarkLight) return C.colorBackgroundDarkLight;
      if (props.colorBackgroundDarkLighter) return C.colorBackgroundDarkLighter;
      return C.colorBackgroundTheme;
    };

    const backgroundColor = resolveBackgroundColor();

    if (preventScroll)
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

export { Screen };
