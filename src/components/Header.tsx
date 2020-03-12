import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useEffect
} from "react";
import { observer } from "mobx-react";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { IconButton } from "~/components/IconButton";
import { constants as C } from "~/style";
import { shadow } from "~/utils/shadow";
import { CartButton } from "./CartButton";

/*******
 *
 * Component
 *
 *******/

export const HeaderContext = createContext(undefined);

export const HeaderProvider = props => {
  const [LeftComponent, setLeftComponent] = useState(null);
  const [RightComponent, setRightComponent] = useState(null);

  const value = React.useMemo(
    () => ({
      LeftComponent,
      RightComponent,
      setLeftComponent,
      setRightComponent
    }),
    [LeftComponent, RightComponent]
  );

  return <HeaderContext.Provider value={value} {...props} />;
};

/*******
 *
 * Component
 *
 *******/

const S = StyleSheet.create({
  headerContainer: {
    height: 52,
    backgroundColor: C.colorBackgroundTheme,
    ...shadow(2)
  },
  backButton: {
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerLeft: { position: "absolute", top: 0, left: 0, bottom: 0 },
  headerRight: { position: "absolute", top: 0, right: 0, bottom: 0 },
  titleText: { width: "50%" }
});

export const Header = observer(props => {
  const handleBackPress = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const title = props?.scene?.descriptor?.options?.title;

  const canGoBack = props.navigation.canGoBack();

  const { LeftComponent, RightComponent } = useContext(HeaderContext);

  return (
    <View centerContent style={S.headerContainer}>
      <Text
        colorLight
        sizeLarge
        style={S.titleText}
        alignCenter
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {title}
      </Text>

      <View alignItemsCenter flexDirectionRow style={S.headerLeft}>
        {canGoBack && (
          <IconButton
            style={S.backButton}
            onPress={handleBackPress}
            iconName="chevron-left"
            iconSize={28}
            iconColor={C.colorTextLight}
          />
        )}
        {LeftComponent}
      </View>

      <View justifyContentCenter flexDirectionRow style={S.headerRight}>
        {RightComponent}
        <CartButton />
      </View>
    </View>
  );
});

/******
 *
 *    Hooks
 *
 ******/

export function useLeftComponent(LeftComponent, deps) {
  const isValid =
    LeftComponent === null ||
    LeftComponent === undefined ||
    React.isValidElement(LeftComponent);
  if (!isValid)
    console.error(
      "LeftComponent must be a valid React component. For example <Text>C</Text>"
    );

  const { setLeftComponent } = useContext(HeaderContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => setLeftComponent(LeftComponent), 0);
      return () => {
        setLeftComponent(null);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, ...deps]);
}

export function useRightComponent(RightComponent, deps) {
  const isValid =
    RightComponent === null ||
    RightComponent === undefined ||
    React.isValidElement(RightComponent);
  if (!isValid)
    console.error(
      "RightComponent must be a valid React component. For example <Text>C</Text>"
    );

  const { setRightComponent } = useContext(HeaderContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => setRightComponent(RightComponent), 0);
      return () => {
        setRightComponent(null);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, ...deps]);
}
