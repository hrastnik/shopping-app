import React, { useState } from "react";
import { observer } from "mobx-react";

import { TextInput } from "~/components/TextInput";
import { Text } from "~/components/Text";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { useStore } from "~/mobx/useStore";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "~/components/Spacer";

export const LoginScreen = observer(() => {
  const store = useStore();
  const navigation = useNavigation();

  const [email, setEmail] = useState("hrastnikmateo@gmail.com");
  const [password, setPassword] = useState("test1234");

  const [error, setError] = useState(undefined);

  return (
    <Screen>
      <View paddingMedium justifyContentCenter>
        <View flexDirectionRow justifyContentSpaceBetween>
          <Text sizeSmall>Email</Text>
          <Text colorDanger sizeSmall>
            Username too short
          </Text>
        </View>
        <Spacer small />
        <TextInput value={email} onChangeText={setEmail} />
        <Spacer />
        <View flexDirectionRow justifyContentSpaceBetween>
          <Text sizeSmall>Password</Text>
          <Text colorDanger sizeSmall>
            Username too short
          </Text>
        </View>
        <Spacer small />
        <TextInput value={password} onChangeText={setPassword} />
        <Spacer />

        {error && <Text>{error}</Text>}

        {store.authStore.isLoggedIn && (
          <Text>User: {store.authStore.activeUser.username}</Text>
        )}
        <Spacer extraLarge />

        <Button
          title="SUBMIT"
          onPress={async () => {
            try {
              setError(undefined);
              await store.authStore.login({ identifier: email, password });
              // navigation.navigate("RegionListScreen");
            } catch (error) {
              setError(error.message);
            }
          }}
        />

        <Spacer />

        <Button
          transparent
          colorLight
          title="SIGN UP"
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        />
      </View>
    </Screen>
  );
});
