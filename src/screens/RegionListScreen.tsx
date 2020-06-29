import React, { useCallback } from "react";
import { observer } from "mobx-react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import color from "color";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { RegionInstance } from "~/mobx/entities/region/Region";
import { constants as C } from "~/style";
import { shadow } from "~/utils/shadow";
import { Image } from "~/components/Image";

const S = StyleSheet.create({
  flex: { flex: 1 },
  image: { width: "100%", aspectRatio: 2.4 },
  cardShadow: { borderRadius: 8, ...shadow(3), opacity: 0.99 },
  mapWrap: { borderRadius: 8, overflow: "hidden" },
  overlay: {
    flex: 1,
    backgroundColor: color(C.colorBackgroundDark).alpha(0.2).string(),
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: 8,
    overflow: "hidden",
  },
  titleText: {
    width: "100%",
    textShadowColor: C.colorBackgroundDark,
    textShadowRadius: 9,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    color: C.colorTextLight,
  },
});

export const RegionListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();
  const query = useQuery(
    (store) => store.regionStore.readRegionList,
    (store) => store.regionStore.map
  );

  const renderItem: ListRenderItem<RegionInstance> = useCallback(
    ({ item: region }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            store.uiStore.set("activeRegion", region.id);
            navigation.navigate("PickAddressScreen");
          }}
        >
          <View paddingMedium>
            <View style={S.cardShadow}>
              <View style={S.mapWrap}>
                <Image source={region.image.source} style={S.image} />
              </View>

              <View style={StyleSheet.absoluteFill}>
                <View style={S.overlay} paddingMedium>
                  <Text
                    sizeExtraLarge
                    weightBold
                    alignRight
                    style={S.titleText}
                  >
                    {` ${region.name} `}
                  </Text>
                </View>
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
        ListHeaderComponent={
          <View paddingMedium>
            <Text>Pick a region closest to your location</Text>
          </View>
        }
        renderItem={renderItem}
      />
    </Screen>
  );
});
