import React from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "~/components/Screen";

import { UpdateAccountForm } from "~/features/update-account-form/update-account-form.component";
import { ScreenNavigationProp } from "./RouterTypes";

export const UpdateAccountScreen = observer(() => {
  const navigation = useNavigation<
    ScreenNavigationProp<"UpdateAccountScreen">
  >();

  return (
    <Screen>
      <UpdateAccountForm
        onSuccess={() => {
          navigation.goBack();
        }}
      />
    </Screen>
  );
});
