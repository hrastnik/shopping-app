import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

import { constants as C } from "~/style";
import { IconButton } from "./IconButton";
import { ScreenNavigationProp } from "~/screens/RouterTypes";

export const EditProfileButton = observer(() => {
  const navigation = useNavigation<ScreenNavigationProp<"Tab.ProfileScreen">>();

  const handleEditPress = useCallback(async () => {
    navigation.navigate("UpdateAccountScreen");
  }, [navigation]);

  return (
    <IconButton
      iconName="account-edit"
      iconColor={C.colorTextLight}
      onPress={handleEditPress}
    />
  );
});
