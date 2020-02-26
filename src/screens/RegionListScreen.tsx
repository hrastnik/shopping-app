import React, { useCallback } from "react";
import { observer } from "mobx-react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";
import color from "color";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { RegionInstance } from "~/mobx/entities/region/Region";
import { constants as C } from "~/style";

const S = StyleSheet.create({
  flex: { flex: 1 },
  map: { width: "100%", aspectRatio: 2.4 },
  overlay: {
    flex: 1,
    backgroundColor: color(C.colorBackgroundDark)
      .alpha(0.5)
      .string(),
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
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
            <MapView
              liteMode
              region={{
                latitude: region.lat,
                longitude: region.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
              }}
              style={S.map}
            />
            <View style={StyleSheet.absoluteFill} paddingMedium>
              <View style={S.overlay} paddingMedium>
                <Text sizeExtraLarge weightBold>
                  {region.name}
                </Text>
              </View>
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
