import React from "react";

import { observer } from "mobx-react";
import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";

export const ProfileScreen = observer(() => {
  return (
    <Screen preventScroll centerContent>
      <Text weightBold>Profile Screen</Text>
    </Screen>
  );
});
