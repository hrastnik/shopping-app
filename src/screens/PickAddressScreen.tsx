import React from "react";
import { observer } from "mobx-react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Screen } from "~/components/Screen";
import { useStore } from "~/mobx/useStore";
import { PickAddressForm } from "~/features/pick-address-form/pick-address-form.component";

export const PickAddressScreen = observer(() => {
  const navigation = useNavigation();
  const store = useStore();
  const route = useRoute();
  const onAccept = route.params?.onAccept;

  return (
    <Screen>
      <PickAddressForm
        initialValues={{
          address:
            (store.cartStore.address || store.authStore.activeUser.address) ??
            "",
          city: (store.cartStore.city || store.authStore.activeUser.city) ?? "",
        }}
        onAccept={(values) => {
          store.cartStore.setFullAddress(values);

          if (typeof onAccept === "function") {
            onAccept();
          } else {
            navigation.replace("Stack.TabNavigator");
          }
        }}
      />
    </Screen>
  );
});
