import React, { useCallback } from "react";
import { observer } from "mobx-react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { ProductInstance } from "~/mobx/entities/product/Product";

const S = StyleSheet.create({
  flex: { flex: 1 }
});

export const ProductListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();

  const query = useQuery(
    store => store.uiStore.activeShop.readProductList,
    store => store.productStore.map
  );

  const renderItem: ListRenderItem<ProductInstance> = useCallback(
    ({ item: product }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            store.uiStore.set("activeProduct", product.id);
            navigation.navigate("ProductDetails");
          }}
        >
          <View paddingMedium>
            <Text>{JSON.stringify(product, null, 2)}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation, store.uiStore]
  );

  if (query.isLoadingFirst) {
    return (
      <Screen preventScroll>
        <View aspectRatioOne centerContent>
          <Text>Loading...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen preventScroll>
      <FlatList
        {...query.flatListProps}
        style={S.flex}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Screen>
  );
});
