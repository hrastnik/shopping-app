import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Header } from "~/components";
import { HomeScreen } from "~/screens/HomeScreen";
import { SecretZadarScreen } from "~/screens/SecretZadarScreen";
import { SecretDetailsScreen } from "~/screens/SecretDetailsScreen";
import { MapScreen } from "~/screens/MapScreen";
import { MusicScreen } from "~/screens/MusicScreen";
import { GalleryScreen } from "~/screens/GalleryScreen";

const Stack = createStackNavigator();

export function Router() {
  const screenOptions = {
    header(props) {
      return <Header {...props} />;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SecretZadar"
          component={SecretZadarScreen}
          options={{ title: "SECRET ZADAR" }}
        />
        <Stack.Screen
          name="SecretDetails"
          component={SecretDetailsScreen}
          options={{ title: "SECRET ZADAR" }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: "MAP" }}
        />
        <Stack.Screen
          name="Music"
          component={MusicScreen}
          options={{ title: "SECRET ZADAR" }}
        />
        <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
