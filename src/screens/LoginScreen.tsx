import React, { useState } from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { TextInput, Button, Text } from "~/components";
import { useStore } from "~/mobx/useStore";

export const LoginScreen = observer(() => {
  const [email, setEmail] = useState("hrastnikmateo@gmail.com");
  const [password, setPassword] = useState("test1234");

  const store = useStore();

  const [error, setError] = useState(undefined);

  return (
    <Screen>
      <View paddingMedium justifyContentCenter>
        <TextInput value={email} onChangeText={setEmail} />
        <TextInput value={password} onChangeText={setPassword} />

        {error && <Text>{error}</Text>}

        {store.authStore.isLoggedIn && (
          <Text>User: {store.authStore.activeUser.username}</Text>
        )}

        <Button
          title="SUBMIT"
          onPress={async () => {
            try {
              setError(undefined);
              await store.authStore.login({ identifier: email, password });
            } catch (error) {
              setError(error.message);
            }
          }}
        />
      </View>
    </Screen>
  );
});
