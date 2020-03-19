import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { FlatList, StyleSheet, ListRenderItem } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "~/components/Screen";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { Image } from "~/components/Image";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { ShopInstance } from "~/mobx/entities/shop/Shop";
import { constants as C } from "~/style";
import { shadow } from "~/utils/shadow";

const S = StyleSheet.create({
  flex: { flex: 1 },
  shopImage: { width: "100%", aspectRatio: 2.4 },
  card: {
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: C.colorBackgroundTheme,
    opacity: 0.98,
    ...shadow(3)
  }
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
            navigation.navigate("ProductListScreen");
          }}
          paddingMedium
        >
          <View style={S.card}>
            {shop.image && (
              <Image
                source={shop.image.source}
                style={S.shopImage}
                resizeMode="cover"
              />
            )}
            <View paddingMedium>
              <Text weightBold>{shop.name}</Text>
              <Text>{shop.about}</Text>
            </View>
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
