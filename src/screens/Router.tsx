import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Header } from "~/components/Header";
import { LoginScreen } from "~/screens/LoginScreen";
import { SignUpScreen } from "~/screens/SignUpScreen";
import { RegionListScreen } from "~/screens/RegionListScreen";
import { ShopListScreen } from "~/screens/ShopListScreen";
import { ProductListScreen } from "~/screens/ProductListScreen";
import { useStore } from "~/mobx/useStore";
import { ProductDetailsScreen } from "./ProductDetailsScreen";

const Stack = createStackNavigator();

export function Router() {
  const store = useStore();

  const screenOptions = {
    header(props) {
      return <Header {...props} />;
    }
  };

  const { isLoggedIn } = store.authStore;

  const shouldShowAuth = isLoggedIn === false;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {shouldShowAuth ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: true, title: "Login" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: true, title: "Sign Up" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="RegionList"
              component={RegionListScreen}
              options={{ headerShown: true, title: "Region List" }}
            />
            <Stack.Screen
              name="ShopList"
              component={ShopListScreen}
              options={{ headerShown: true, title: "Shop List" }}
            />
            <Stack.Screen
              name="ProductList"
              component={ProductListScreen}
              options={{ headerShown: true, title: "Product List" }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{ headerShown: true, title: "Product Details" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
