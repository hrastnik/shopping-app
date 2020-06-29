import React from "react";

import { observer } from "mobx-react";
import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { constants } from "~/style";
import { Spacer } from "~/components/Spacer";
import { useStore } from "~/mobx/useStore";
import { MeasureLayout } from "~/components/MeasureLayout";

export const ProfileScreen = observer(() => {
  const store = useStore();
  const user = store.authStore.activeUser;

  if (!user) {
    return null;
  }

  return (
    <Screen>
      <View centerContent paddingExtraLarge>
        <View
          aspectRatioOne
          style={{
            width: "50%",
            maxWidth: 300,
            borderRadius: 150,
            backgroundColor: constants.colorBackgroundThemeSofter,
          }}
        >
          <MeasureLayout>
            {({ width }) => {
              return (
                <View flex centerContent>
                  <Text style={{ fontSize: width / 2 }}>
                    {user.firstName[0].toUpperCase()}
                  </Text>
                </View>
              );
            }}
          </MeasureLayout>
        </View>
      </View>

      <View paddingMedium>
        <Text weightLight>Logged in as:</Text>
        <Text weightBold>
          {user.firstName} {user.lastName}
        </Text>

        <Spacer large />

        <Text weightLight>Email</Text>
        <Text weightBold>{user.email}</Text>

        <Spacer large />

        <Text weightLight>Phone number</Text>
        <Text weightBold>{user.phone}</Text>

        {Boolean(user.city) && (
          <>
            <Spacer large />

            <Text weightLight>City</Text>
            <Text weightBold>{user.city}</Text>
          </>
        )}

        {Boolean(user.address) && (
          <>
            <Spacer large />

            <Text weightLight>Address</Text>
            <Text weightBold>{user.address}</Text>
          </>
        )}

        <Spacer large />

        {/* <Text weightLight>Account created</Text>
        <Text weightBold>{user.created_at.fromNow()}</Text> */}
      </View>
    </Screen>
  );
});
