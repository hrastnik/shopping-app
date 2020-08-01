import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type StackParamList = {
  LoginScreen: undefined;
  CreateAccountScreen: undefined;

  RegionListScreen: undefined;
  PickAddressScreen: { onAccept?: () => any };
  "Stack.TabNavigator": undefined;
  ProductListScreen: {
    shopId?: number;
    categoryId?: number;
    regionId?: number;
  };
  ProductDetailsScreen: undefined;
  UpdateAccountScreen: undefined;
  CartScreen: undefined;
  CheckoutScreen: undefined;
  MyOrderListScreen: undefined;

  ShopListScreen: undefined;
  CategoryListScreen: undefined;
  FavoriteProductListScreen: undefined;
  ProfileScreen: undefined;
};

export type TabParamList = {
  "Tab.ShopListScreen": undefined;
  "Tab.CategoryListScreen": { test: string };
  "Tab.FavoriteProductListScreen": undefined;
  "Tab.ProfileScreen": undefined;
};

export type ScreenNavigationProp<
  T extends keyof StackParamList | keyof TabParamList
> = T extends keyof StackParamList
  ? StackNavigationProp<StackParamList, T>
  : T extends keyof TabParamList
  ? CompositeNavigationProp<
      BottomTabNavigationProp<TabParamList, T>,
      StackNavigationProp<StackParamList>
    >
  : never;

export type ScreenRouteProp<
  T extends keyof StackParamList | keyof TabParamList
> = T extends keyof StackParamList
  ? RouteProp<StackParamList, T>
  : T extends keyof TabParamList
  ? RouteProp<TabParamList, T>
  : never;
