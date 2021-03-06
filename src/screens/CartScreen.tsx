import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { FlatList, StyleSheet, ListRenderItem } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenNoScroll } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { keyExtractor } from "~/utils/keyExtractor";
import { ProductInstance } from "~/mobx/entities/product/Product";
import { constants as C } from "~/style";
import { Spacer } from "~/components/Spacer";
import { Button } from "~/components/Button";
import { useAlert } from "~/components/AlertProvider";
import { shadow } from "~/utils/shadow";
import { promptYesNo } from "~/utils/promptYesNo";
import {
  ProductListItemProps,
  ProductListItem,
} from "~/components/ProductListItem";
import { ScreenNavigationProp } from "./RouterTypes";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall },

  bottomCard: {
    backgroundColor: C.colorBackgroundThemeHarder,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: C.spacingExtraLarge,
    ...shadow(2),
  },
});

export const CartScreen = observer(() => {
  const navigation = useNavigation<ScreenNavigationProp<"CartScreen">>();
  const store = useStore();
  const alert = useAlert();

  const handlePress: ProductListItemProps["onPress"] = useCallback(
    (product) => {
      store.uiStore.set("activeProduct", product.id);
      navigation.navigate("ProductDetailsScreen");
    },
    [navigation, store.uiStore]
  );

  const handleRemoveFromCart = useCallback<
    ProductListItemProps["onRemoveFromCart"]
  >(
    (cartItem) => {
      return promptYesNo(
        {
          title: "Confirm",
          message: `Are you sure you want to remove "${cartItem.product.name}" from your cart?`,
        },
        alert
      );
    },
    [alert]
  );

  const renderItem: ListRenderItem<ProductInstance> = useCallback(
    ({ item: product }) => {
      return (
        <ProductListItem
          product={product}
          onPress={handlePress}
          onRemoveFromCart={handleRemoveFromCart}
        />
      );
    },
    [handlePress, handleRemoveFromCart]
  );

  return (
    <ScreenNoScroll>
      <FlatList
        data={store.cartStore.cartProducts}
        numColumns={2}
        style={S.flex}
        contentContainerStyle={S.contentContainer}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <View aspectRatioOne centerContent>
            <Text alignCenter>There's nothing here</Text>
            <Text alignCenter>Go add something first</Text>
          </View>
        }
      />

      <View paddingMedium style={S.bottomCard}>
        {store.cartStore.priceByShop.map((data) => {
          const numItemsText =
            data.numItems === 1 ? "1 product" : `${data.numItems} products`;
          const numProductText = `${data.numProducts} unique`;
          return (
            <React.Fragment key={`${data.shop.id}`}>
              <View flexDirectionRow justifyContentSpaceBetween>
                <Text>
                  {data.shop.name} - {numItemsText}, {numProductText}
                </Text>
                <Text weightSemiBold>{data.price.toFixed(2)} $</Text>
              </View>

              <Spacer />
            </React.Fragment>
          );
        })}

        <View
          style={{
            marginBottom: C.spacingLarge,
            backgroundColor: C.colorTextLightSofter,
            height: 1,
          }}
        />

        <View flexDirectionRow justifyContentSpaceBetween>
          <Text>Total:</Text>
          <Text weightBold sizeLarge>
            {store.cartStore.totalPrice.toFixed(2)} $
          </Text>
        </View>

        <Spacer />

        <Button
          colorAccent
          title="CONTINUE TO CHECKOUT"
          disabled={store.cartStore.numCartItems === 0}
          onPress={() => {
            navigation.navigate("CheckoutScreen");
          }}
        />
      </View>
    </ScreenNoScroll>
  );
});
