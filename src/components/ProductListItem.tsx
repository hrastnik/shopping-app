import React from "react";
import { observer } from "mobx-react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Image } from "~/components/Image";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { Spacer } from "~/components/Spacer";
import { QuantityPicker } from "~/components/QuantityPicker";
import { ProductInstance } from "~/mobx/entities/product/Product";
import { useStore } from "~/mobx/useStore";
import { constants as C } from "~/style";
import { shadow } from "~/utils/shadow";
import { CartItemInstance } from "~/mobx/CartStore";

const S = StyleSheet.create({
  flex: { flex: 1 },
  column: {
    width: "50%",
    padding: C.spacingSmall,
  },
  card: {
    ...shadow(2),
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: C.colorBackgroundTheme,
  },
  productImage: { width: "100%", aspectRatio: 1.6 },
});

export interface ProductListItemProps {
  product: ProductInstance;
  onPress: (product: ProductInstance) => any;
  onRemoveFromCart?: (cartItem: CartItemInstance) => Promise<boolean>;
}

export type ProductListItem = typeof ProductListItem;
export const ProductListItem = observer((props: ProductListItemProps) => {
  const store = useStore();
  const handlePress = () => props.onPress(props.product);

  const { cart, addToCart } = store.cartStore;

  const cartItem = cart.get(props.product.id.toString());

  const handleQuantityChange = async (quantity) => {
    if (cartItem) {
      if (quantity <= 0) {
        if (props.onRemoveFromCart) {
          const shouldRemove = await props.onRemoveFromCart(cartItem);
          if (!shouldRemove) return;
        }
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
              uri: "https://placebear.com/300/300",
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
            <Text sizeExtraSmall style={S.flex}>
              {props.product.categories.map((c) => c.name).join(", ")}
            </Text>
            <Spacer small />
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
