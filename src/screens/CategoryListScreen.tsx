import React, { useCallback } from "react";
import { observer } from "mobx-react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import color from "color";

import { Screen } from "~/components/Screen";
import { Image } from "~/components/Image";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { CategoryInstance } from "~/mobx/entities/category/Category";
import { constants as C } from "~/style";
import { useNavigation } from "@react-navigation/native";
import { shadow } from "~/utils/shadow";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall },
  column: {
    width: "33.3333%",
    aspectRatio: 1,
    padding: C.spacingSmall,
  },
  overlay: {
    flex: 1,
    backgroundColor: color(C.colorBackgroundDark).alpha(0.15).string(),
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.colorBackgroundLight,
  },
  categoryText: {
    textShadowColor: C.colorBackgroundDark,
    textShadowRadius: 9,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
  },
});

export const CategoryListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();
  const query = useQuery((store) => {
    return {
      query: store.categoryStore.readCategoryList,
      resourceMap: store.categoryStore.map,
    };
  });

  const regionId = store.uiStore.activeRegionId;

  const renderItem: ListRenderItem<CategoryInstance> = useCallback(
    ({ item: category }) => {
      return (
        <TouchableOpacity
          style={S.column}
          onPress={() => {
            navigation.navigate("ProductListScreen", {
              categoryId: category.id,
              regionId,
            });
          }}
        >
          <View
            flex
            style={{
              opacity: 0.99,
              borderRadius: 4,
              overflow: "hidden",
              ...shadow(2),
            }}
          >
            <Image
              style={S.image}
              source={category.image.source}
              resizeMode="cover"
            />
            <View style={S.overlay} paddingMedium>
              <Text sizeLarge weightBold style={S.categoryText}>
                {category.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation, regionId]
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
      <FlatList
        {...query.flatListProps}
        contentContainerStyle={S.contentContainer}
        numColumns={3}
        style={S.flex}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Screen>
  );
});
