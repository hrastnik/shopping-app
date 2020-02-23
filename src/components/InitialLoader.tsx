import React, { useEffect, useState, useMemo, useCallback } from "react";
import { SafeAreaView, SafeAreaViewProps } from "react-navigation";
import * as Font from "expo-font";
import { observer } from "mobx-react";
import { Platform } from "react-native";

import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  HeaderProvider,
  ModalProvider,
  AlertProvider,
  Spinner
} from "~/components";
import { constants as C } from "~/style";
import { createRouter } from "~/router";
import { persistence, navigation } from "~/services";
import { checkForOTAUpdates } from "~/utils";
import { useStore } from "~/mobx/utils/useStore";

const SafeAreaInsets: SafeAreaViewProps["forceInset"] = {
  top: "always",
  bottom: "always"
};

const S = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.colorBackgroundTheme },
  keyboardAvoids: { flex: 1 }
});

function useLoadFonts() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fontLoadPromise = Font.loadAsync({
      "OpenSans-Bold": require("../../../assets/fonts/OpenSans-Bold.ttf"),
      "OpenSans-BoldItalic": require("../../../assets/fonts/OpenSans-BoldItalic.ttf"),
      "OpenSans-ExtraBold": require("../../../assets/fonts/OpenSans-ExtraBold.ttf"),
      "OpenSans-ExtraBoldItalic": require("../../../assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
      "OpenSans-Light": require("../../../assets/fonts/OpenSans-Light.ttf"),
      "OpenSans-LightItalic": require("../../../assets/fonts/OpenSans-LightItalic.ttf"),
      "OpenSans-Regular": require("../../../assets/fonts/OpenSans-Regular.ttf"),
      "OpenSans-RegularItalic": require("../../../assets/fonts/OpenSans-RegularItalic.ttf"),
      "OpenSans-SemiBold": require("../../../assets/fonts/OpenSans-SemiBold.ttf"),
      "OpenSans-SemiBoldItalic": require("../../../assets/fonts/OpenSans-SemiBoldItalic.ttf")
    });

    fontLoadPromise.then(() => {
      setIsReady(true);
    });
  }, []);

  return isReady;
}

function useOnboardingScreens() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(undefined);
  useEffect(() => {
    async function checkOnboardingScreens() {
      const shouldSkipOnboarding = await persistence.get(
        "should skip onboarding"
      );
      setShouldShowOnboarding(!shouldSkipOnboarding);
    }

    checkOnboardingScreens();
  }, []);

  return { shouldShowOnboarding };
}

const InitialLoader = observer(function InitialLoader() {
  const store = useStore();
  const isFontReady = useLoadFonts();
  const { shouldShowOnboarding } = useOnboardingScreens();

  useEffect(() => {
    if (!__DEV__) checkForOTAUpdates();
  }, []);

  const grabNavigationRef = useCallback(nav => {
    navigation.setNavigation(nav);
  }, []);

  const Router = useMemo(() => {
    if (!store.authStore.isSilentLoginOver) return null;
    if (shouldShowOnboarding === undefined) return null;

    return createRouter({
      initialRoute: store.authStore.isLoggedIn ? "MainFlow" : "AuthFlow",
      shouldShowOnboarding
    });
  }, [
    store.authStore.isSilentLoginOver,
    store.authStore.isLoggedIn,
    shouldShowOnboarding
  ]);

  const isReady =
    Router !== null && isFontReady && shouldShowOnboarding !== undefined;

  if (!isReady) {
    return (
      <View
        flex
        centerContent
        style={{ backgroundColor: C.colorBackgroundTheme }}
      >
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <ModalProvider>
      <AlertProvider>
        <HeaderProvider>
          <SafeAreaView forceInset={SafeAreaInsets} style={S.safeArea}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "android" ? "height" : "padding"}
              style={S.keyboardAvoids}
            >
              <Router ref={grabNavigationRef} />
            </KeyboardAvoidingView>
          </SafeAreaView>
        </HeaderProvider>
      </AlertProvider>
    </ModalProvider>
  );
});

export { InitialLoader };
