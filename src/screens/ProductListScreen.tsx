import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { FlatList, StyleSheet, ListRenderItem } from "react-native";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { ProductInstance } from "~/mobx/entities/product/Product";
import { constants as C } from "~/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ProductListItemProps,
  ProductListItem,
} from "~/components/ProductListItem";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall },
});

export const ProductListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();
  const route = useRoute();
  const regionId = store.uiStore.activeRegionId;
  const { categoryId, shopId } = route.params as {
    categoryId: number;
    shopId: number;
  };

  const query = useQuery(
    (store) => (params) => {
      const filters = {};
      if (shopId != null) {
        filters["filter[shop.id][eq]"] = shopId;
      }
      if (regionId != null) {
        filters["filter[shop.region][eq]"] = regionId;
      }
      if (categoryId != null) {
        filters["filter[category_list.category_id][eq]"] = categoryId;
      }
      console.warn(filters);

      return store.productStore.readProductList({ ...params, ...filters });
    },
    (store) => store.productStore.map
  );

  const handlePress: ProductListItemProps["onPress"] = useCallback(
    (product) => {
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
        numColumns={2}
        style={S.flex}
        contentContainerStyle={S.contentContainer}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
      />
    </Screen>
  );
});
