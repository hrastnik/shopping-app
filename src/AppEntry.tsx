import "react-native-gesture-handler";
import "mobx-react-lite/batchingForReactNative";

import { enableScreens } from "react-native-screens";

import { StatusBar, Platform, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { Provider } from "mobx-react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { createPersistence } from "~/services/persistence/createPersistence";
import { createHttp } from "~/services/http/createHttp";

import { Router } from "~/screens/Router";
import { HeaderProvider } from "~/components/Header";
import { ModalProvider } from "~/components/ModalProvider";
import { createStore } from "~/mobx/createStore";
import { constants } from "~/style";
import { AlertProvider } from "./components/AlertProvider";

// react-navigation performance optimization
enableScreens();

const S = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: constants.colorBackgroundThemeHarder,
  },
});

async function loadFonts() {
  await Font.loadAsync({
    "SignikaNegative-Light": require("./assets/Signika_Negative/SignikaNegative-Light.ttf"),
    "SignikaNegative-SemiBold": require("./assets/Signika_Negative/SignikaNegative-SemiBold.ttf"),
    "SignikaNegative-Bold": require("./assets/Signika_Negative/SignikaNegative-Bold.ttf"),
    "SignikaNegative-Regular": require("./assets/Signika_Negative/SignikaNegative-Regular.ttf"),
  });
}

async function initialize() {
  StatusBar.setBarStyle("light-content");
  if (Platform.OS === "android")
    StatusBar.setBackgroundColor(constants.colorBackgroundTheme);
  StatusBar.setBarStyle("light-content");

  const http = createHttp();
  const persistence = createPersistence();
  const store = await createStore({ http, persistence });

  await loadFonts();

  return { store };
}

export function AppEntry() {
  const [isReady, setIsReady] = useState(false);
  const store = useRef(undefined);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={() =>
          initialize().then((context) => {
            store.current = context.store;
          })
        }
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <Provider store={store.current}>
        <SafeAreaView style={S.safeAreaView}>
          <ModalProvider>
            <AlertProvider>
              <HeaderProvider>
                <Router />
              </HeaderProvider>
            </AlertProvider>
          </ModalProvider>
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
}
