import React from "react";
import { observer } from "mobx-react";
import { FlatList, StyleSheet } from "react-native";

import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { constants as C } from "~/style";
import { Spinner } from "~/components/Spinner";

import { CategoryListItem } from "./category-list-item.component";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall },
});

export const CategoryListView = observer(() => {
  const query = useQuery((store) => {
    return {
      query: store.categoryStore.readCategoryList,
      resourceMap: store.categoryStore.map,
    };
  });

  if (query.isFirstLoad) {
    return (
      <View aspectRatioOne centerContent>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      {...query.flatListProps}
      contentContainerStyle={S.contentContainer}
      numColumns={3}
      style={S.flex}
      keyExtractor={keyExtractor}
      renderItem={({ item: category }) => {
        return <CategoryListItem category={category} />;
      }}
      ListFooterComponent={
        query.isFetchingNext ? (
          <View paddingLarge centerContent>
            <Spinner />
          </View>
        ) : null
      }
    />
  );
});
