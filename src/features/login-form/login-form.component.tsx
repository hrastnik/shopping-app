import React from "react";
import { observer } from "mobx-react";

import { TextInput } from "~/components/TextInput";
import { Button } from "~/components/Button";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { Modal } from "~/components/ModalProvider";

import { UseLoginFormProps, useLoginForm } from "./login-form.hook";

export interface LoginFormProps {
  onSuccess?: UseLoginFormProps["onSuccess"];
}

export const LoginForm = observer(({ onSuccess }: LoginFormProps) => {
  const { fields, submitForm, isSubmitting } = useLoginForm({ onSuccess });

  return (
    <View paddingExtraLarge justifyContentCenter>
      {isSubmitting && <Modal />}

      <TextInput
        label="Email"
        autoCapitalize="none"
        autoCompleteType="email"
        autoCorrect
        autoFocus
        dataDetectorTypes="none"
        keyboardType="email-address"
        placeholder="john.doe@email.com"
        secureTextEntry={false}
        maxLength={50}
        error={fields.email.hasError}
        caption={fields.email.error}
        blurOnSubmit={false}
        onBlur={fields.email.onBlur}
        onChangeText={fields.email.onChangeText}
        onSubmitEditing={fields.email.onSubmitEditing}
        value={fields.email.value}
      />

      <Spacer small />

      <TextInput
        label="Password"
        autoCapitalize="none"
        autoCompleteType="password"
        autoCorrect={false}
        autoFocus={false}
        dataDetectorTypes="none"
        keyboardType="default"
        placeholder="********"
        secureTextEntry
        textContentType="password"
        spellCheck={false}
        maxLength={undefined}
        ref={fields.password.ref}
        error={fields.password.hasError}
        caption={fields.password.error}
        onBlur={fields.password.onBlur}
        onChangeText={fields.password.onChangeText}
        onSubmitEditing={fields.password.onSubmitEditing}
        value={fields.password.value}
      />

      <Spacer extraLarge />

      <Button disabled={isSubmitting} title="SUBMIT" onPress={submitForm} />
    </View>
  );
});
