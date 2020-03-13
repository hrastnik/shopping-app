import React, { useCallback } from "react";
import { observer } from "mobx-react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem
} from "react-native";

import { Screen } from "~/components/Screen";
import { Image } from "~/components/Image";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { keyExtractor } from "~/utils/keyExtractor";
import { ProductInstance } from "~/mobx/entities/product/Product";
import { constants as C } from "~/style";
import { Spacer } from "~/components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { QuantityPicker } from "~/components/QuantityPicker";
import { Button } from "~/components/Button";
import { shadow } from "~/utils/shadow";
import { promptYesNo } from "~/utils/promptYesNo";
import { useAlert } from "~/components/AlertProvider";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall },
  column: {
    width: "50%",
    padding: C.spacingSmall
  },
  card: {
    borderColor: C.colorTextLightSoft,
    borderWidth: 1,
    borderRadius: 4
  },
  productImage: { width: "100%", aspectRatio: 1.6 },

  bottomCard: {
    backgroundColor: C.colorBackgroundThemeHarder,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: C.spacingExtraLarge,
    ...shadow(2)
  }
});

interface ProductListItemProps {
  product: ProductInstance;
  onPress: (product: ProductInstance) => any;
}

const ProductListItem = observer((props: ProductListItemProps) => {
  const store = useStore();
  const alert = useAlert();
  const handlePress = () => props.onPress(props.product);

  const { cart, addToCart } = store.cartStore;

  const cartItem = cart.get(props.product.id.toString());

  const handleQuantityChange = async quantity => {
    if (cartItem) {
      if (quantity === 0) {
        const shouldRemove = await promptYesNo(
          {
            title: "Confirm",
            message: `Are you sure you want to remove "${props.product.name}" from your cart?`
          },
          alert
        );
        if (!shouldRemove) return;
      }
      cartItem.setQuantity(quantity);
    } else {
      addToCart(props.product);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={S.column}>
      <View flex style={S.card}>
        <Image
          source={
            props.product.image?.source ?? {
              uri: "https://placebear.com/300/300"
            }
          }
          style={S.productImage}
          resizeMode="cover"
        />

        <Spacer small />

        <View paddingSmall flex>
          <View flex>
            <Text weightBold>{props.product.name}</Text>
            <Text sizeSmall>{props.product.description}</Text>
          </View>

          <View>
            <Text>{props.product.shop.name}</Text>
          </View>

          <View flexDirectionRow alignItemsFlexEnd>
            <Text sizeExtraSmall style={{ flex: 1 }}>
              {props.product.categories.map(c => c.name).join(", ")}
            </Text>
            <QuantityPicker
              value={cartItem?.quantity ?? 0}
              onChange={handleQuantityChange}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export const CartScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();

  const handlePress: ProductListItemProps["onPress"] = useCallback(
    product => {
      store.uiStore.set("activeProduct", product.id);
      navigation.navigate("ProductDetailsScreen");
    },
    [navigation, store.uiStore]
  );

  const renderItem: ListRenderItem<ProductInstance> = useCallback(
    ({ item: product }) => {
      return <ProductListItem product={product} onPress={handlePress} />;
    },
    [handlePress]
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

        <Button colorAccent title="CONTINUE TO CHECKOUT" onPress={() => {}} />
      </View>
    </Screen>
  );
});
