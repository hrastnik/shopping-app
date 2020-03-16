import React, { useCallback } from "react";
import { observer } from "mobx-react";

import { useStore } from "~/mobx/useStore";
import { constants as C } from "~/style";
import { IconButton } from "./IconButton";
import { promptYesNo } from "~/utils/promptYesNo";
import { useAlert } from "./AlertProvider";

export const LogoutButton = observer(() => {
  const store = useStore();
  const alert = useAlert();

  const handleLogoutPress = useCallback(async () => {
    const shouldLogout = await promptYesNo(
      {
        title: "Confirm",
        message: "Are you sure you want to logout?"
      },
      alert
    );
    if (!shouldLogout) return;
    store.authStore.logout();
  }, [alert, store.authStore]);

  return (
    <IconButton
      iconName="logout"
      iconColor={C.colorTextLight}
      onPress={handleLogoutPress}
    />
  );
});
