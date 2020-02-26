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
import { ProductInstance } from "~/mobx/entities/product/Product";
import { constants as C } from "~/style";
import { Spacer } from "~/components/Spacer";

const S = StyleSheet.create({
  flex: { flex: 1 },
  contentContainer: { padding: C.spacingSmall },
  column: {
    width: "50%",
    padding: C.spacingSmall
  },
  card: {
    borderColor: C.colorTextLightSoft,
    borderWidth: 1,
    borderRadius: 4
  },
  productImage: { width: "100%", aspectRatio: 1.6 }
});

export const ProductListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();

  const query = useQuery(
    store => store.uiStore.activeShop.readProductList,
    store => store.productStore.map
  );

  const renderItem: ListRenderItem<ProductInstance> = useCallback(
    ({ item: product }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            store.uiStore.set("activeProduct", product.id);
            navigation.navigate("ProductDetails");
          }}
          style={S.column}
        >
          <View flex style={S.card}>
            <Image
              source={
                product.image?.source ?? {
                  uri: "https://placebear.com/300/300"
                }
              }
              style={S.productImage}
              resizeMode="contain"
            />
            <Spacer small />
            <View paddingSmall>
              <Text weightBold>{product.name}</Text>
              <Text>{product.description}</Text>
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
        numColumns={2}
        style={S.flex}
        contentContainerStyle={S.contentContainer}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Screen>
  );
});
