import React, { useCallback } from "react";
import { observer } from "mobx-react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { RegionInstance } from "~/mobx/entities/region/Region";
import { ShopInstance } from "~/mobx/entities/shop/Shop";

const S = StyleSheet.create({
  flex: { flex: 1 },
  shopImage: { width: "100%", aspectRatio: 2.4 }
});

export const ShopListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();

  const query = useQuery(
    store => store.uiStore.activeRegion.readShopList,
    store => store.shopStore.map
  );

  const renderItem: ListRenderItem<ShopInstance> = useCallback(
    ({ item: shop }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            store.uiStore.set("activeShop", shop.id);
            navigation.navigate("ProductList");
          }}
        >
          <View paddingMedium>
            {shop.image && (
              <Image
                source={shop.image.source}
                style={S.shopImage}
                resizeMode="cover"
              />
            )}
            <Text sizeLarge weightBold>
              {shop.name}
            </Text>
            <Text sizeLarge>{shop.about}</Text>
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
