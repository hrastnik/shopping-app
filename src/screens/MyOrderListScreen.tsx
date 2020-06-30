import React from "react";

import { observer } from "mobx-react";
import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { useQuery } from "~/mobx/useQuery";
import { FlatList } from "react-native";
import { Spacer } from "~/components/Spacer";
import { keyExtractor } from "~/utils/keyExtractor";

export const MyOrderListScreen = observer(() => {
  const query = useQuery((store) => {
    return {
      query(params) {
        return store.orderStore.readOrderList({
          ...params,
          sort: "-created_at",
        });
      },
      resourceMap: store.orderStore.map,
    };
  });

  return (
    <Screen preventScroll>
      <FlatList
        {...query.flatListProps}
        keyExtractor={keyExtractor}
        renderItem={({ item: order, index }) => {
          return (
            <View paddingMedium>
              <Text>
                {index + 1}. Created {order.created_at.fromNow()}
              </Text>
              <Spacer small />
              <Text colorLightSofter sizeSmall>
                {order.data.delivery_data.city}
              </Text>
              <Text colorLightSofter sizeSmall>
                {order.data.delivery_data.address}
              </Text>
              <Text colorLightSofter sizeSmall>
                Tel. {order.data.delivery_data.phone_number}
              </Text>

              <Spacer />
              {order.data.cart_items.map((context, index) => {
                const { name, shop, price, categories } = context.product;
                return (
                  <View flexDirectionRow key={index.toString()}>
                    <Text sizeSmall numberOfLines={1} style={{ flex: 2 }}>
                      {name}
                    </Text>
                    <Text sizeSmall numberOfLines={1} style={{ flex: 1 }}>
                      {shop}
                    </Text>
                    <Text sizeSmall style={{ flex: 1 }}>
                      {categories.join(", ")}
                    </Text>
                    <Text
                      sizeSmall
                      numberOfLines={1}
                      style={{ flex: 1, textAlign: "right" }}
                    >
                      {price}$
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        }}
      />
    </Screen>
  );
});
