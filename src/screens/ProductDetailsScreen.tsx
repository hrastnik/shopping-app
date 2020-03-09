import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Image, StyleSheet, RefreshControl } from "react-native";
import Carousel from "react-native-snap-carousel";

import { Text } from "~/components/Text";
import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { useStore } from "~/mobx/useStore";
import { IconButton } from "~/components/IconButton";
import { useRightComponent } from "~/components/Header";
import { constants } from "~/style";
import { ImageInstance } from "~/mobx/util-models/Image";
import { Spacer } from "~/components/Spacer";

const S = StyleSheet.create({
  image: { width: "100%", aspectRatio: 1 }
});

export const ProductDetailsScreen = observer(() => {
  const store = useStore();

  const product = store.uiStore.activeProduct;
  useEffect(() => {
    product.refresh();
  }, [product]);

  const [refreshing, setRefreshing] = useState(false);

  useRightComponent(
    <IconButton
      onPress={product.toggleFavorite}
      iconName={product.isFavorited ? "heart" : "heart-outline"}
    />,
    [product, product.isFavorited]
  );

  return (
    <Screen
      preventScroll={false}
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
      <View>
        <Carousel
          data={product.images}
          renderItem={({ item }) => {
            const image = item as ImageInstance;
            return (
              <Image
                source={image.source}
                style={S.image}
                resizeMode="contain"
              />
            );
          }}
          sliderWidth={constants.windowWidth - constants.spacingMedium * 2}
          itemWidth={
            (constants.windowWidth - constants.spacingMedium * 2) * 0.8
          }
        />
      </View>
      <View paddingMedium justifyContentCenter>
        <Text weightBold>{product.name}</Text>
        <Text>{product.description}</Text>

        <Spacer extraLarge />
        <Text>{product.priceText}</Text>
      </View>
    </Screen>
  );
});
