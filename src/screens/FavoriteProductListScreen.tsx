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
  productImage: { width: "100%", aspectRatio: 1.6 }
});

interface ProductListItemProps {
  product: ProductInstance;
  onPress: (product: ProductInstance) => any;
}

const ProductListItem = observer((props: ProductListItemProps) => {
  const store = useStore();
  const handlePress = () => props.onPress(props.product);

  const { cart, addToCart } = store.cartStore;
  const cartItem = cart.get(props.product.id.toString());

  const handleQuantityChange = quantity => {
    if (cartItem) {
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

export const FavoriteProductListScreen = observer(() => {
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
        data={store.uiStore.favoriteProductList}
        numColumns={2}
        style={S.flex}
        contentContainerStyle={S.contentContainer}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Screen>
  );
});
