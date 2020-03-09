import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react";

import { useStore } from "~/mobx/useStore";
import { Header } from "~/components/Header";
import { LoginScreen } from "~/screens/LoginScreen";
import { SignUpScreen } from "~/screens/SignUpScreen";
import { RegionListScreen } from "~/screens/RegionListScreen";
import { ShopListScreen } from "~/screens/ShopListScreen";
import { ProductListScreen } from "~/screens/ProductListScreen";
import { ProductDetailsScreen } from "~/screens/ProductDetailsScreen";
import { ProfileScreen } from "~/screens/ProfileScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />
    </>
  );
};

const TabNavigator = () => {
  const screenOptions: React.ComponentProps<
    typeof Stack.Navigator
  >["screenOptions"] = {
    headerShown: true,
    headerStatusBarHeight: 0,
    header(props) {
      return <Header {...props} />;
    }
  };

  return (
    <Tabs.Navigator backBehavior="none">
      <Tabs.Screen name="Tab.RegionListScreen">
        {() => {
          return (
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen
                options={{ title: "Region List" }}
                component={RegionListScreen}
                name="RegionListScreen"
              />
            </Stack.Navigator>
          );
        }}
      </Tabs.Screen>
      <Tabs.Screen name="Tab.ProfileScreen">
        {() => {
          return (
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen
                options={{ title: "Profile" }}
                component={ProfileScreen}
                name="ProfileScreen"
              />
            </Stack.Navigator>
          );
        }}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

const MainStack = () => {
  console.warn("MainStack rendering");
  return (
    <>
      <Stack.Screen
        name="Stack.TabNavigator"
        options={{ headerShown: false }}
        component={TabNavigator}
      />

      <Stack.Screen
        name="ShopListScreen"
        component={ShopListScreen}
        options={{ title: "Shop List" }}
      />
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{ title: "Product List" }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{ title: "Product Details" }}
      />
    </>
  );
};

export const Router = observer(() => {
  const store = useStore();

  const screenOptions: React.ComponentProps<
    typeof Stack.Navigator
  >["screenOptions"] = {
    headerShown: true,
    header(props) {
      return <Header {...props} />;
    }
  };

  const { isLoggedIn } = store.authStore;

  const shouldShowAuth = isLoggedIn === false;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          {shouldShowAuth ? AuthStack() : MainStack()}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
});
