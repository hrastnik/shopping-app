import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { FlatList, StyleSheet, ListRenderItem } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenNoScroll } from "~/components/Screen";
import { useStore } from "~/mobx/useStore";
import { keyExtractor } from "~/utils/keyExtractor";
import { ProductInstance } from "~/mobx/entities/product/Product";
import { constants as C } from "~/style";
import {
  ProductListItemProps,
  ProductListItem,
} from "~/components/ProductListItem";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { ScreenNavigationProp } from "./RouterTypes";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall },
  column: {
    width: "50%",
    padding: C.spacingSmall,
  },
});

export const FavoriteProductListScreen = observer(() => {
  const navigation = useNavigation<
    ScreenNavigationProp<"Tab.FavoriteProductListScreen">
  >();
  const store = useStore();

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

  return (
    <ScreenNoScroll>
      <FlatList
        data={store.uiStore.favoriteProductList}
        numColumns={2}
        style={S.flex}
        contentContainerStyle={S.contentContainer}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <View aspectRatioOne centerContent paddingExtraLarge>
            <Text alignCenter colorLightSoft>
              You haven't added any products to favorites yet
            </Text>
          </View>
        }
      />
    </ScreenNoScroll>
  );
});
