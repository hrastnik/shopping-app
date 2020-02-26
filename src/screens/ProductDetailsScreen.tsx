import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Image, StyleSheet, RefreshControl } from "react-native";

import { Text } from "~/components/Text";
import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { useStore } from "~/mobx/useStore";

const S = StyleSheet.create({
  image: { aspectRatio: 1 }
});

export const ProductDetailsScreen = observer(() => {
  const store = useStore();

  const product = store.uiStore.activeProduct;
  useEffect(() => {
    product.refresh();
  }, [product]);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <Screen
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            product.refresh().then(() => setRefreshing(false));
          }}
        />
      }
    >
      <View paddingMedium justifyContentCenter>
        <Text>{JSON.stringify(product, null, 2)}</Text>

        {product.images.map(image => (
          <Image key={image.url} style={S.image} source={image.source} />
        ))}
      </View>
    </Screen>
  );
});
