import React, { useState } from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { TextInput, Button, Text } from "~/components";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";

export const RegionSelectScreen = observer(() => {
  const store = useStore();
  const navigation = useNavigation();

  const query = useQuery(
    store => store.regionStore.readRegionList,
    store => store.regionStore.map
  );

  if (query.isFirstLoad) {
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
      <Text>num regions {store.regionStore.map.size}</Text>
      <FlatList
        style={{ flex: 1 }}
        {...query.flatListProps}
        renderItem={({ item: region }) => {
          return (
            <View paddingMedium>
              <Text>{JSON.stringify(region, null, 2)}</Text>
            </View>
          );
        }}
      />
    </Screen>
  );
});
