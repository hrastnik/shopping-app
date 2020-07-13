import React from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";

import { LoginForm } from "~/features/login-form/login-form.component";

export const LoginScreen = observer(() => {
  const navigation = useNavigation();

  return (
    <Screen>
      <LoginForm />

      <Spacer />

      <Button
        transparent
        colorLight
        title="SIGN UP"
        onPress={() => {
          navigation.navigate("CreateAccountScreen");
        }}
      />
    </Screen>
  );
});
