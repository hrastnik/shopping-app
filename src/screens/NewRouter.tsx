import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef
} from "react";
import { observer } from "mobx-react";
import posed, { Transition } from "react-native-pose";

import { LoginScreen } from "~/screens/LoginScreen";
import { SignUpScreen } from "~/screens/SignUpScreen";
import { RegionListScreen } from "~/screens/RegionListScreen";
import { ShopListScreen } from "~/screens/ShopListScreen";
import { ProductListScreen } from "~/screens/ProductListScreen";
import { ProductDetailsScreen } from "~/screens/ProductDetailsScreen";
import { ProfileScreen } from "~/screens/ProfileScreen";
import { observable, action, autorun } from "mobx";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { StyleSheet, BackHandler } from "react-native";
import { constants as C } from "~/style";

const screens = {
  LoginScreen: { component: LoginScreen, meta: { title: "Login" } },
  SignUpScreen: { component: SignUpScreen, meta: { title: "Sign Up" } },
  RegionListScreen: {
    component: RegionListScreen,
    meta: { title: "Select Region" }
  },
  ProfileScreen: { component: ProfileScreen, meta: { title: "Profile" } },
  ShopListScreen: { component: ShopListScreen, meta: { title: "Shops" } },
  ProductListScreen: {
    component: ProductListScreen,
    meta: { title: "Products" }
  },
  ProductDetailsScreen: {
    component: ProductDetailsScreen,
    meta: { title: "Product" }
  }
};

const navigationState = observable({
  activeScreenKeys: ["LoginScreen"],
  screens,
  get activeScreens(): { component: any; meta: any; key: string }[] {
    return navigationState.activeScreenKeys.map(key => {
      return { ...navigationState.screens[key], key };
    });
  },

  get focusedScreenKey(): ScreenKey {
    const { activeScreenKeys: activeScreens } = navigationState;
    const activeScreenKey = activeScreens[activeScreens.length - 1];
    return activeScreenKey as ScreenKey;
  },
  get activeScreenUniqueKey(): string {
    const { activeScreenKeys: activeScreens } = navigationState;
    const activeScreenKey = activeScreens[activeScreens.length - 1];
    return activeScreenKey + (activeScreens.length - 1);
  },
  get focusedScreen(): { component: any; meta: any } {
    return navigationState.screens[navigationState.focusedScreenKey];
  }
});

autorun(() => {
  console.warn(navigationState.activeScreenKeys.join(", "));
});
type ScreenKey = keyof typeof screens;

const navigationActions = {
  setMeta: action((screenKey: ScreenKey, meta): void => {
    const screen = navigationState.screens[screenKey];
    screen.meta = { ...screen.meta, ...meta };
  }),
  navigate: action((screenKey: ScreenKey): void => {
    navigationState.activeScreenKeys.push(screenKey);
  }),
  replaceActive: action((screenKey: ScreenKey): void => {
    navigationState.activeScreenKeys[
      navigationState.activeScreenKeys.length - 1
    ] = screenKey;
  }),
  replaceAll: action((screenKey: ScreenKey): void => {
    navigationState.activeScreenKeys = [screenKey];
  }),
  goBack: action((): void => {
    navigationState.activeScreenKeys.pop();
  })
};

const navigation = { state: navigationState, actions: navigationActions };

const NavigationContext = createContext(null);

export const XuseNavigation = (): typeof navigation => {
  return useContext(NavigationContext);
};

const ScreenMissingError = () => {
  const style = { backgroundColor: "white" };
  return (
    <View flex centerContent style={style}>
      <Text>Missing screen</Text>
    </View>
  );
};

const ScreenWrap = posed.View({
  enter: {
    x: 0,
    transition: { ease: "easeInOut" }
  },
  exit: {
    x: -C.windowWidth,
    transition: { ease: "easeInOut" }
  }
});

export const Router = observer(() => {
  useEffect(() => {
    return BackHandler.addEventListener("hardwareBackPress", () => {
      if (navigation.state.activeScreenKeys.length > 1) {
        navigation.actions.goBack();
        return true;
      }
    }).remove;
  }, []);

  return (
    <NavigationContext.Provider value={navigation}>
      <Transition>
        {navigation.state.activeScreens.map((Screen, index) => {
          return (
            <ScreenWrap style={StyleSheet.absoluteFill} key={Screen.key}>
              <Screen.component />
            </ScreenWrap>
          );
        })}
      </Transition>
    </NavigationContext.Provider>
  );
});
