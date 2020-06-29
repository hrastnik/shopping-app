import React from "react";
import { observer } from "mobx-react";
import { StyleSheet } from "react-native";

import { useStore } from "~/mobx/useStore";
import { View } from "./View";
import { IconButton } from "./IconButton";
import { Text } from "./Text";
import { constants as C } from "~/style";

const S = StyleSheet.create({
  badge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: C.colorBackgroundAccent,
  },
});

export const CartButton = observer(() => {
  const store = useStore();
  const { numCartItems } = store.cartStore;
  return (
    <View>
      <IconButton
        iconName="shopping-cart"
        onPress={() => {
          store.navigation.navigate("CartScreen");
        }}
      />
      {numCartItems > 0 && (
        <View centerContent absoluteBottomRightSmall style={S.badge}>
          <Text sizeExtraSmall>{numCartItems}</Text>
        </View>
      )}
    </View>
  );
});
