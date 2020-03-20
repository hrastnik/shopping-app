import React from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useStore } from "~/mobx/useStore";
import { constants } from "~/style";
import { promptYesNo } from "~/utils/promptYesNo";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { useAlert } from "~/components/AlertProvider";
import { View } from "~/components/View";

export const CheckoutScreen = observer(() => {
  const store = useStore();
  const alert = useAlert();
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <Screen>
      <View paddingVerticalMedium>
        {store.cartStore.priceByShop.map(context => {
          return (
            <View key={context.shop.id}>
              <View
                flexDirectionRow
                alignItemsFlexEnd
                justifyContentSpaceBetween
                paddingHorizontalMedium
              >
                <Text weightSemiBold sizeLarge>
                  {context.shop.name}
                  <Text colorLightSofter weightBold>
                    {`    ` + context.numItems}
                  </Text>
                  <Text colorLightSofter> products{`   `}</Text>
                  <Text colorLightSofter weightBold>
                    {context.numProducts}
                  </Text>
                  <Text colorLightSofter> unique</Text>
                </Text>
              </View>
              <Spacer />
              <View
                flexDirectionRow
                justifyContentSpaceBetween
                paddingHorizontalMedium
                paddingVerticalSmall
              >
                <Text weightSemiBold style={{ flex: 3 }}>
                  Name
                </Text>
                <Text weightSemiBold alignRight style={{ flex: 1 }}>
                  $/item
                </Text>
                <Text weightSemiBold alignRight style={{ flex: 1 }}>
                  Qty
                </Text>
                <Text weightSemiBold alignRight style={{ flex: 1 }}>
                  Price
                </Text>
              </View>

              {context.cartItems.map((cartItem, index) => {
                return (
                  <View
                    key={cartItem.product.id}
                    flexDirectionRow
                    justifyContentSpaceBetween
                    alignItemsFlexEnd
                    paddingHorizontalMedium
                    paddingVerticalSmall
                    style={{
                      backgroundColor:
                        index % 2
                          ? constants.colorBackgroundThemeHard
                          : constants.colorBackgroundThemeHarder
                    }}
                  >
                    <Text style={{ flex: 3 }}>{cartItem.product.name}</Text>
                    <Spacer />
                    <Text alignRight style={{ flex: 1 }}>
                      {cartItem.product.price.toFixed(2)}
                    </Text>
                    <Spacer />
                    <Text alignRight style={{ flex: 1 }}>
                      {cartItem.quantity}
                    </Text>
                    <Spacer />
                    <Text alignRight style={{ flex: 1 }}>
                      {cartItem.price.toFixed(2)}
                    </Text>
                  </View>
                );
              })}

              <Spacer />
              <View
                flexDirectionRow
                paddingMedium
                style={{
                  backgroundColor: constants.colorBackgroundThemeHarder
                }}
              >
                <Text style={{ flex: 4 }} weightSemiBold>
                  TOTAL
                </Text>
                <Text style={{ flex: 1 }} alignRight weightBold colorLightSoft>
                  {context.numItems}
                </Text>
                <Text style={{ flex: 1 }} alignRight weightBold>
                  {context.price.toFixed(2)}
                </Text>
              </View>
              <Spacer extraLarge />
            </View>
          );
        })}
        <View flexDirectionRow justifyContentSpaceBetween paddingMedium>
          <Text sizeExtraLarge>TOTAL</Text>
          <Text sizeExtraLarge weightBold>
            {store.cartStore.totalPrice.toFixed(2)}$
          </Text>
        </View>
        <Spacer extraLarge />
        <View paddingMedium>
          <Text weightSemiBold>Delivery address</Text>
          <Text>{store.cartStore.city}</Text>
          <Text>{store.cartStore.address}</Text>
          <Spacer />
          <Button
            title="CONFIRM ORDER"
            colorAccent
            onPress={async () => {
              const shouldProceed = await promptYesNo({
                title: "Confirm",
                message: `Your order of ${store.cartStore.totalPrice.toFixed(
                  2
                )}$ will be delivered to ${store.cartStore.city}, ${
                  store.cartStore.address
                }.\nDo you want to proceed?`
              });
              if (!shouldProceed) return;
              try {
                await store.cartStore.confirmOrder();
                alert("Success", "Your order is on the way!");
                navigation.popToTop();
              } catch (error) {
                alert("Error", `Something went wrong:\n${error.message}`);
                console.warn(error);
              }
            }}
          />
        </View>
      </View>
    </Screen>
  );
});
