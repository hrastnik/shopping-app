import "react-native-gesture-handler";

import React, { useEffect, useState, useRef } from "react";
import { Provider } from "mobx-react";
import Orientation from "react-native-orientation";

import { Router } from "~/screens/Router";
import { HeaderProvider } from "~/components/HeaderHooks";
import { ModalProvider } from "~/components/ModalProvider";
import { createHttp } from "~/services/http/createHttp";
import { createPersistence } from "~/services/persistence/createPersistence";
import { createStore } from "~/mobx/createStore";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { constants } from "./style";
import { StatusBar, Platform, StyleSheet } from "react-native";

const S = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: constants.colorBackgroundThemeHarder
  }
});

async function initialize() {
  Orientation.lockToPortrait();

  StatusBar.setBarStyle("light-content");
  if (Platform.OS === "android")
    StatusBar.setBackgroundColor(constants.colorBackgroundThemeHarder);

  const http = createHttp();
  const persistence = createPersistence();
  const store = await createStore({ http, persistence });

  return { store };
}

export function AppEntry() {
  const [isReady, setIsReady] = useState(false);
  const store = useRef(undefined);

  useEffect(() => {
    initialize().then(context => {
      store.current = context.store;
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store.current}>
        <SafeAreaView style={S.safeAreaView}>
          <ModalProvider>
            <HeaderProvider>
              <Router />
            </HeaderProvider>
          </ModalProvider>
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
}
