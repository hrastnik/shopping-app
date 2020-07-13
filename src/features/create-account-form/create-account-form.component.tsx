import React from "react";
import { observer } from "mobx-react";

import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { TextInput } from "~/components/TextInput";
import { Button } from "~/components/Button";
import { Modal } from "~/components/ModalProvider";

import {
  useCreateAccountForm,
  UseCreateAccountFormProps,
} from "./create-account-form.hook";

export interface CreateAccountFormProps {
  onSuccess?: UseCreateAccountFormProps["onSuccess"];
}

export const CreateAccountForm = observer(
  ({ onSuccess }: CreateAccountFormProps) => {
    const { fields, isSubmitting, submitForm } = useCreateAccountForm({
      onSuccess,
    });

    return (
      <View paddingExtraLarge>
        {isSubmitting && <Modal />}

        <Text>Account</Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect
          autoFocus
          blurOnSubmit={false}
          dataDetectorTypes="none"
          keyboardType="email-address"
          maxLength={50}
          placeholder="john.doe@email.com"
          secureTextEntry={false}
          textContentType="emailAddress"
          error={fields.email.hasError}
          caption={fields.email.error}
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
          blurOnSubmit={false}
          dataDetectorTypes="none"
          keyboardType="default"
          maxLength={undefined}
          placeholder="********"
          secureTextEntry
          textContentType="password"
          error={fields.password.hasError}
          caption={fields.password.error}
          onBlur={fields.password.onBlur}
          onChangeText={fields.password.onChangeText}
          onSubmitEditing={fields.password.onSubmitEditing}
          value={fields.password.value}
        />

        <Spacer small />

        <TextInput
          label="First name"
          autoCapitalize="words"
          autoCompleteType="name"
          autoCorrect={false}
          autoFocus={false}
          dataDetectorTypes="none"
          keyboardType="default"
          placeholder="John"
          secureTextEntry={false}
          maxLength={128}
          blurOnSubmit={false}
          textContentType="givenName"
          error={fields.firstName.hasError}
          caption={fields.firstName.error}
          onBlur={fields.firstName.onBlur}
          onChangeText={fields.firstName.onChangeText}
          onSubmitEditing={fields.firstName.onSubmitEditing}
          value={fields.firstName.value}
        />

        <Spacer small />

        <TextInput
          label="Last name"
          autoCapitalize="words"
          autoCompleteType="name"
          autoCorrect={false}
          autoFocus={false}
          blurOnSubmit={false}
          dataDetectorTypes="none"
          keyboardType="default"
          maxLength={128}
          placeholder="Doe"
          secureTextEntry={false}
          textContentType="familyName"
          error={fields.lastName.hasError}
          caption={fields.lastName.error}
          onBlur={fields.lastName.onBlur}
          onChangeText={fields.lastName.onChangeText}
          onSubmitEditing={fields.lastName.onSubmitEditing}
          value={fields.lastName.value}
        />

        <Spacer small />

        <TextInput
          label="Phone number"
          autoCapitalize="none"
          autoCompleteType="tel"
          autoCorrect={false}
          autoFocus={false}
          blurOnSubmit={false}
          dataDetectorTypes="none"
          keyboardType="phone-pad"
          maxLength={16}
          placeholder="555123456"
          secureTextEntry={false}
          textContentType="telephoneNumber"
          error={fields.phone.hasError}
          caption={fields.phone.error}
          onBlur={fields.phone.onBlur}
          onChangeText={fields.phone.onChangeText}
          onSubmitEditing={fields.phone.onSubmitEditing}
          value={fields.phone.value}
        />

        <Spacer small />

        <TextInput
          label="City"
          autoCapitalize="words"
          autoCompleteType="street-address"
          autoCorrect
          autoFocus={false}
          blurOnSubmit={false}
          dataDetectorTypes="none"
          keyboardType="default"
          maxLength={64}
          placeholder="London"
          secureTextEntry={false}
          textContentType="addressCity"
          error={fields.city.hasError}
          caption={fields.city.error}
          onBlur={fields.city.onBlur}
          onChangeText={fields.city.onChangeText}
          onSubmitEditing={fields.city.onSubmitEditing}
          value={fields.city.value}
        />

        <Spacer small />

        <TextInput
          label="Address"
          autoCapitalize="words"
          autoCompleteType="street-address"
          autoCorrect
          autoFocus={false}
          blurOnSubmit={false}
          dataDetectorTypes="none"
          keyboardType="default"
          maxLength={64}
          placeholder="Baker Street 221B"
          secureTextEntry={false}
          textContentType="fullStreetAddress"
          error={fields.address.hasError}
          caption={fields.address.error}
          onBlur={fields.address.onBlur}
          onChangeText={fields.address.onChangeText}
          onSubmitEditing={fields.address.onSubmitEditing}
          value={fields.address.value}
        />

        <Spacer extraLarge />

        <Button title="SUBMIT" disabled={isSubmitting} onPress={submitForm} />
      </View>
    );
  }
);
