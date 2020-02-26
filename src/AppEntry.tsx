import "react-native-gesture-handler";

import { StatusBar, Platform, StyleSheet, View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect, useState, useRef } from "react";
import { Provider } from "mobx-react";

import { createPersistence } from "~/services/persistence/createPersistence";
import { createHttp } from "~/services/http/createHttp";

import { Router } from "~/screens/Router";
import { HeaderProvider } from "~/components/Header";
import { ModalProvider } from "~/components/ModalProvider";
import { createStore } from "~/mobx/createStore";
import { constants } from "~/style";

const S = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: constants.colorBackgroundThemeHarder
  },
  flexCenterContent: { flex: 1, justifyContent: "center", alignItems: "center" }
});

async function initialize() {
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
    return (
      <View style={S.flexCenterContent}>
        <Text>Loading</Text>
      </View>
    );
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
