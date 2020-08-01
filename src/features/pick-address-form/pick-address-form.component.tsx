import React from "react";

import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { Button } from "~/components/Button";
import { Spacer } from "~/components/Spacer";
import { TextInput } from "~/components/TextInput";

import { usePickAddressForm } from "./pick-address-form.hook";
import { Modal } from "~/components/ModalProvider";

type PickAddressFormProps = Parameters<typeof usePickAddressForm>["0"];

export const PickAddressForm = ({
  initialValues,
  onAccept,
}: PickAddressFormProps) => {
  const {
    fields,
    isSubmitting,
    submitForm,
    isDetectingAddress,
    detectAddress,
  } = usePickAddressForm({ onAccept, initialValues });

  return (
    <View paddingMedium>
      {(isSubmitting || isDetectingAddress) && <Modal />}
      <Spacer />

      <Text>Enter the address at which you want the order delivered</Text>
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

      <Spacer />
      <Text alignCenter>or</Text>
      <Spacer />

      <Button
        transparent
        colorLight
        title="DETECT YOUR LOCATION"
        onPress={detectAddress}
      />

      <Spacer extraLarge />

      <Button title="ACCEPT" colorAccent onPress={submitForm} />
    </View>
  );
};
