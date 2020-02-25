import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Header } from "~/components";
import { LoginScreen } from "~/screens/LoginScreen";
import { SignUpScreen } from "~/screens/SignUpScreen";
import { RegionSelectScreen } from "~/screens/RegionSelectScreen";

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
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RegionSelect"
          component={RegionSelectScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
