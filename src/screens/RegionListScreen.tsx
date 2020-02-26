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
import { RegionInstance } from "~/mobx/entities/region/Region";

const S = StyleSheet.create({
  flex: { flex: 1 }
});

export const RegionListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();
  const query = useQuery(
    store => store.regionStore.readRegionList,
    store => store.regionStore.map
  );

  const renderItem: ListRenderItem<RegionInstance> = useCallback(
    ({ item: region }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            store.uiStore.set("activeRegion", region.id);
            navigation.navigate("ShopList");
          }}
        >
          <View paddingMedium>
            <Text>{JSON.stringify(region, null, 2)}</Text>
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
