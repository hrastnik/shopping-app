import React from "react";
import { observer } from "mobx-react";

// import { useStore } from "~/mobx/utils/useStore";
import { IconWithBadge } from "~/components/IconWithBadge";
import { IconProps } from "~/components/Icon";

import { constants as C } from "~/style";

const NotificationIconWithBadge = observer(function NotificationIconWithBadge({
  size = 28,
  color = C.colorTextLight,
}: {
  size?: IconProps["size"];
  color?: IconProps["color"];
}) {
  // const store = useStore();
  const count = 1; // store.notificationStore.numUnreadNotifications;
  const shouldShowBadge = count > 0;
  return (
    <IconWithBadge
      name="notifications"
      size={size}
      color={color}
      shouldShowBadge={shouldShowBadge}
      count={count}
    />
  );
});

export { NotificationIconWithBadge };
