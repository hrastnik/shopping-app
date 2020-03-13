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

  // const navigation = useNavigation();
  // useRightComponent(
  //   <IconButton
  //     iconName="account-edit"
  //     onPress={() => {
  //       navigation.navigate("ProfileEditScreen");
  //     }}
  //   />,
  //   []
  // );

  return (
    <Screen>
      <View centerContent paddingExtraLarge>
        <View
          aspectRatioOne
          style={{
            width: "50%",
            maxWidth: 300,
            borderRadius: 150,
            backgroundColor: constants.colorBackgroundThemeSofter
          }}
        >
          <MeasureLayout>
            {({ width }) => {
              return (
                <View flex centerContent>
                  <Text style={{ fontSize: width / 2 }}>
                    {user.username[0].toUpperCase()}
                  </Text>
                </View>
              );
            }}
          </MeasureLayout>
        </View>
      </View>

      <View paddingMedium>
        <Text sizeSmall weightLight>
          Logged in as:
        </Text>
        <Text weightBold>{user.username}</Text>

        <Spacer />

        <Text sizeSmall weightLight>
          Email
        </Text>
        <Text weightBold>{user.email}</Text>

        <Spacer />

        <Text sizeSmall weightLight>
          Account created
        </Text>
        <Text weightBold>{user.created_at.fromNow()}</Text>
      </View>
    </Screen>
  );
});
