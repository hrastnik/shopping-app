import React, { useCallback, ComponentProps, memo, useState } from "react";
import { observer } from "mobx-react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
  Image
} from "react-native";

import { Screen } from "~/components/Screen";
import { View, ViewProps } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { useQuery } from "~/mobx/useQuery";
import { keyExtractor } from "~/utils/keyExtractor";
import { ProductInstance } from "~/mobx/entities/product/Product";
import { constants as C } from "~/style";
import { Spacer } from "~/components/Spacer";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { TouchableOpacityProps } from "~/components/TouchableOpacity";
import { Spinner } from "~/components/Spinner";

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

interface ProductListItemProps {
  product: ProductInstance;
  onPress: (product: ProductInstance) => any;
}

const ProductListItem = memo((props: ProductListItemProps) => {
  const handlePress = () => props.onPress(props.product);

  return (
    <TouchableOpacity onPress={handlePress} style={S.column}>
      <View flex style={S.card}>
        <Image
          source={
            props.product.image?.source ?? {
              uri: "https://placebear.com/300/300"
            }
          }
          fadeDuration={0}
          style={S.productImage}
          resizeMode="contain"
        />
        <Spacer small />
        <View paddingSmall>
          <Text weightBold>{props.product.name}</Text>
          <Text>{props.product.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export const ProductListScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();

  const category = store.uiStore.activeCategory;
  const shopId = store.uiStore.activeShopId;

  const query = useQuery(
    store => params =>
      store.productStore.readProductList({
        ...params,
        categories_containss: category?.uid,
        shop: shopId
      }),
    store => store.productStore.map
  );

  const handlePress: ProductListItemProps["onPress"] = useCallback(
    product => {
      store.uiStore.set("activeProduct", product.id);
      navigation.navigate("ProductDetailsScreen");
    },
    [navigation, store.uiStore]
  );

  const renderItem: ListRenderItem<ProductInstance> = useCallback(
    ({ item: product, index }) => {
      return <ProductListItem product={product} onPress={handlePress} />;
    },
    [handlePress]
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
        ListFooterComponent={
          query.isLoadingNext && <Spinner style={{ margin: C.spacingMedium }} />
        }
        onEndReachedThreshold={0.05}
      />
    </Screen>
  );
});
