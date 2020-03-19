import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { FlatList, StyleSheet, ListRenderItem } from "react-native";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { keyExtractor } from "~/utils/keyExtractor";
import { ProductInstance } from "~/mobx/entities/product/Product";
import { constants as C } from "~/style";
import { Spacer } from "~/components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { Button } from "~/components/Button";
import { shadow } from "~/utils/shadow";
import { promptYesNo } from "~/utils/promptYesNo";
import { useAlert } from "~/components/AlertProvider";
import {
  ProductListItemProps,
  ProductListItem
} from "~/components/ProductListItem";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall },

  bottomCard: {
    backgroundColor: C.colorBackgroundThemeHarder,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: C.spacingExtraLarge,
    ...shadow(2)
  }
});

export const CartScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();
  const alert = useAlert();

  const handlePress: ProductListItemProps["onPress"] = useCallback(
    product => {
      store.uiStore.set("activeProduct", product.id);
      navigation.navigate("ProductDetailsScreen");
    },
    [navigation, store.uiStore]
  );

  const handleRemoveFromCart = useCallback<
    ProductListItemProps["onRemoveFromCart"]
  >(
    cartItem => {
      return promptYesNo(
        {
          title: "Confirm",
          message: `Are you sure you want to remove "${cartItem.product.name}" from your cart?`
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
    <Screen preventScroll>
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
        {store.cartStore.priceByShop.map(data => {
          const numProductText =
            data.numProducts === 1
              ? "1 product"
              : `${data.numProducts} prodcuts`;
          const numItemsText =
            data.numItems === 1 ? "1 item" : `${data.numItems} items`;
          return (
            <React.Fragment key={`${data.shop.id}`}>
              <View flexDirectionRow>
                <Text weightBold>
                  {data.shop.name} ({numProductText} / {numItemsText})
                </Text>
              </View>
              <View
                flexDirectionRow
                justifyContentSpaceBetween
                paddingVerticalMedium
                style={{
                  borderBottomColor: C.colorTextLightSofter,
                  borderBottomWidth: 1
                }}
              >
                <Text>Price:</Text>
                <Text>{data.price.toFixed(2)} $</Text>
              </View>
              <Spacer />
            </React.Fragment>
          );
        })}
        <View flexDirectionRow justifyContentSpaceBetween>
          <Text>Total:</Text>
          <Text weightBold>{store.cartStore.totalPrice.toFixed(2)} $</Text>
        </View>

        <Spacer />

        <Button
          colorAccent
          title="CONTINUE TO CHECKOUT"
          onPress={() => {
            navigation.navigate("CheckoutScreen");
          }}
        />
      </View>
    </Screen>
  );
});
