import React, { useRef } from "react";
import { observer } from "mobx-react";
import { TextInput as RNTextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as yup from "yup";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/useStore";
import { Button } from "~/components/Button";
import { Spacer } from "~/components/Spacer";
import { TextInput } from "~/components/TextInput";
import { Formik } from "formik";

const validationSchema = yup.object({
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required")
});

export const PickAddressScreen = observer(({ route }) => {
  const navigation = useNavigation();
  const store = useStore();

  const initialValues = {
    address:
      (store.cartStore.address || store.authStore.activeUser.address) ?? "",
    city: (store.cartStore.city || store.authStore.activeUser.city) ?? ""
  };

  const addressInput = useRef<RNTextInput>();

  const handleDetectAddressPress = (
    onAddress: (address: { city: string; address: string }) => any
  ) => async () => {
    const result = await Location.getPermissionsAsync();
    if (!result.granted) {
      return;
    }
    const position = await Location.getCurrentPositionAsync();
    const [location] = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    const { city, name, postalCode, region, street } = location;
    onAddress({
      city: `${city}, ${region} (${postalCode})`,
      address: `${street}, ${name}`
    });
  };

  return (
    <Screen>
      <View paddingMedium>
        <Spacer />

        <Text>Enter the address at which you want the order delivered</Text>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          store.cartStore.setFullAddress(values);

          const onAccept = route?.params?.onAccept;
          if (typeof onAccept === "function") {
            onAccept();
          } else {
            navigation.replace("Stack.TabNavigator", {});
          }
        }}
      >
        {({
          values,
          setValues,
          handleChange,
          handleBlur,
          touched,
          errors,
          handleSubmit
        }) => {
          return (
            <View paddingMedium>
              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall>City</Text>
                <Text colorDanger sizeSmall>
                  {touched.city && errors.city}
                </Text>
              </View>
              <Spacer small />
              <TextInput
                value={values.city}
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                onSubmitEditing={addressInput.current?.focus}
              />

              <Spacer />

              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall>Address</Text>
                <Text colorDanger sizeSmall>
                  {touched.address && errors.address}
                </Text>
              </View>
              <Spacer small />
              <TextInput
                ref={addressInput}
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                onSubmitEditing={() => {
                  handleSubmit();
                }}
              />

              <Spacer />
              <Text alignCenter>or</Text>
              <Spacer />

              <Button
                transparent
                colorLight
                title="DETECT YOUR LOCATION"
                onPress={handleDetectAddressPress(values => {
                  setValues(values);
                })}
              />

              <Spacer extraLarge />

              <Button
                title="ACCEPT"
                colorAccent
                onPress={() => handleSubmit()}
              />

              {/* <Text>{JSON.stringify(errors, null, 2)}</Text> */}
            </View>
          );
        }}
      </Formik>
    </Screen>
  );
});
