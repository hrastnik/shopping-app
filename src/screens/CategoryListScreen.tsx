import React, { useCallback } from "react";
import { observer } from "mobx-react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem
} from "react-native";
import color from "color";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { CategoryInstance } from "~/mobx/entities/category/Category";
import { constants as C } from "~/style";
import { useNavigation } from "@react-navigation/native";

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

export const CategoryListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();
  const query = useQuery(
    store => store.categoryStore.readCategoryList,
    store => store.categoryStore.map
  );

  const renderItem: ListRenderItem<CategoryInstance> = useCallback(
    ({ item: category }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            store.uiStore.set("activeCategory", category.id);
            navigation.navigate("ProductListScreen");
          }}
        >
          <View paddingMedium>
            <View style={StyleSheet.absoluteFill} paddingMedium>
              <View style={S.overlay} paddingMedium>
                <Text sizeExtraLarge weightBold>
                  {category.name}
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
    <Screen preventScroll showTabBar>
      <FlatList
        {...query.flatListProps}
        style={S.flex}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Screen>
  );
});
