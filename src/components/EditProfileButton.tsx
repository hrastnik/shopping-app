import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

import { constants as C } from "~/style";
import { IconButton } from "./IconButton";

export const EditProfileButton = observer(() => {
  const navigation = useNavigation();

  const handleEditPress = useCallback(async () => {
    navigation.navigate("ProfileEditScreen");
  }, [navigation]);

  return (
    <IconButton
      iconName="account-edit"
      iconColor={C.colorTextLight}
      onPress={handleEditPress}
    />
  );
});
