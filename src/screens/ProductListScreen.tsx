import React, { useCallback, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Spinner } from "~/components/Spinner";
import {
  ProductListItemProps,
  ProductListItem
} from "~/components/ProductListItem";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall }
});

export const ProductListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();

  const regionId = store.uiStore.activeRegionId;
  const category = store.uiStore.activeCategory;
  const shopId = store.uiStore.activeShopId;

  useEffect(() => {
    return () => {
      store.uiStore.set("activeShop", undefined);
      store.uiStore.set("activeCategory", undefined);
    };
  }, [store.uiStore]);

  const query = useQuery(
    store => params =>
      store.productStore.readProductList({
        ...params,
        categories_containss: category?.uid,
        shop: shopId,
        "shop.region": regionId
      }),
    store => store.productStore.map
  );

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
        ListFooterComponent={
          query.isLoadingNext && <Spinner style={{ margin: C.spacingMedium }} />
        }
        onEndReachedThreshold={0.05}
      />
    </Screen>
  );
});
