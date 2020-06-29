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
import { ProfileEditScreen } from "~/screens/ProfileEditScreen";
import { CategoryListScreen } from "~/screens/CategoryListScreen";
import { FavoriteProductListScreen } from "~/screens/FavoriteProductListScreen";
import { CartScreen } from "~/screens/CartScreen";
import { CheckoutScreen } from "~/screens/CheckoutScreen";
import { PickAddressScreen } from "~/screens/PickAddressScreen";

import { constants as C } from "~/style";
import { Icon } from "~/components/Icon";
import { CartButton } from "~/components/CartButton";
import { View } from "~/components/View";
import { LogoutButton } from "~/components/LogoutButton";
import { FavoriteButton } from "~/components/FavoriteButton";
import { EditProfileButton } from "~/components/EditProfileButton";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerRight: undefined, title: "Login" }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerRight: undefined, title: "Sign Up" }}
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
    },
    headerRight() {
      return <CartButton />;
    },
  };

  return (
    <Tabs.Navigator
      backBehavior="none"
      tabBarOptions={{
        activeTintColor: C.colorTextLight,
        inactiveTintColor: C.colorTextDarkSofter,
        activeBackgroundColor: C.colorBackgroundTheme,
        inactiveBackgroundColor: C.colorBackgroundTheme,
        showLabel: false,
        showIcon: true,
        style: { borderTopWidth: 0 },
        // labelStyle :,
        // labelPosition :,
        // tabStyle:,
        // allowFontScaling :,
        // adaptive :,
        // safeAreaInset :,
        // keyboardHidesTabBar
      }}
    >
      <Tabs.Screen
        name="Tab.ShopListScreen"
        options={{
          tabBarIcon: (props) => (
            <Icon name="shopping-cart" color={props.color} size={props.size} />
          ),
        }}
      >
        {() => {
          return (
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen
                name="ShopListScreen"
                component={ShopListScreen}
                options={{ title: "Shop List" }}
              />
            </Stack.Navigator>
          );
        }}
      </Tabs.Screen>

      <Tabs.Screen
        name="Tab.CategoryListScreen"
        options={{
          tabBarIcon: (props) => (
            <Icon name="tag" color={props.color} size={props.size} />
          ),
        }}
      >
        {() => {
          return (
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen
                name="CategoryListScreen"
                component={CategoryListScreen}
                options={{ title: "Category List" }}
              />
            </Stack.Navigator>
          );
        }}
      </Tabs.Screen>

      <Tabs.Screen
        name="Tab.FavoriteProductListScreen"
        options={{
          tabBarIcon: (props) => (
            <Icon name="heart" color={props.color} size={props.size} />
          ),
        }}
      >
        {() => {
          return (
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen
                options={{ title: "Favorites" }}
                component={FavoriteProductListScreen}
                name="FavoriteProductListScreen"
              />
            </Stack.Navigator>
          );
        }}
      </Tabs.Screen>

      <Tabs.Screen
        name="Tab.ProfileScreen"
        options={{
          tabBarIcon: (props) => (
            <Icon name="person" color={props.color} size={props.size} />
          ),
        }}
      >
        {() => {
          return (
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen
                options={{
                  title: "Profile",
                  headerLeft() {
                    return <EditProfileButton />;
                  },
                  headerRight() {
                    return (
                      <View flexDirectionRow>
                        <LogoutButton />
                        <CartButton />
                      </View>
                    );
                  },
                }}
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
  return (
    <>
      <Stack.Screen
        options={{ title: "Region List", headerRight: undefined }}
        component={RegionListScreen}
        name="RegionListScreen"
      />
      <Stack.Screen
        options={{ title: "Address", headerRight: undefined }}
        component={PickAddressScreen}
        name="PickAddressScreen"
      />
      <Stack.Screen
        name="Stack.TabNavigator"
        options={{ headerShown: false }}
        component={TabNavigator}
      />
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{ title: "Product List" }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{
          title: "Product Details",
          headerRight() {
            return (
              <View flexDirectionRow>
                <FavoriteButton />
                <CartButton />
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: "Cart", headerRight: undefined }}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{ title: "Checkout", headerRight: undefined }}
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
    },
    headerRight() {
      return <CartButton />;
    },
  };

  const { isLoggedIn } = store.authStore;
  const shouldShowAuth = isLoggedIn === false;

  return (
    <>
      <NavigationContainer
        ref={(navigation) => {
          store.setNavigation(navigation);
        }}
      >
        <Stack.Navigator screenOptions={screenOptions}>
          {shouldShowAuth ? AuthStack() : MainStack()}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
});
