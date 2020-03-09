import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";

import { ViewProps, View } from "~/components/View";
import { ScrollViewProps, ScrollView } from "~/components/ScrollView";
import { constants as C } from "~/style";
import { Header } from "./Header";
import { TabBar } from "./TabBar";

const S = StyleSheet.create({
  base: { backgroundColor: C.colorBackgroundTheme, flex: 1 },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: C.colorBackgroundTheme
  }
});

export type ScreenProps = (
  | ({ preventScroll?: false } & ScrollViewProps)
  | ({ preventScroll?: true } & ViewProps)
) & {
  HeaderComponent?: React.ReactElement<any>;
  TabBarComponent?: React.ReactElement<any>;
  showHeader?: boolean;
  showTabBar?: boolean;
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
};

export type Screen = typeof Screen;
export const Screen = React.forwardRef<ScrollView | View, ScreenProps>(
  ({ style, ...props }, ref) => {
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

    if (props.preventScroll === true)
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
