import React, { useRef } from "react";
import { observer } from "mobx-react";
import { TextInput as RNTextInput } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { useStore } from "~/mobx/useStore";
import { TextInput } from "~/components/TextInput";
import { Button } from "~/components/Button";
import { textInputProps } from "~/utils/textInputProps";
import { useNavigation } from "@react-navigation/native";
import { useAlert } from "~/components/AlertProvider";

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .trim()
    .test({
      name: "username_test",
      test: (value: string) => Boolean(value?.match?.(/^[A-Za-z0-9_-]+$/)),
      message: `Only alphanumberic characters, '-' and '_' allowed`
    }),
  email: yup
    .string()
    .required("Email is required")
    .email("Email format is invalid"),
  phone: yup
    .string()
    .required("Phone number is required")
    .min(6, "Phone number too short")
    .max(15, "Phone number too long"),
  city: yup.string().min(2, "City name too short"),
  address: yup.string().min(2, "Address too short")
});

export const ProfileEditScreen = observer(() => {
  const store = useStore();
  const alert = useAlert();
  const user = store.authStore.activeUser;

  const initialValues = {
    username: user.username ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    city: user.city ?? "",
    address: user.address ?? ""
  };

  const emailInput = useRef<RNTextInput>();
  const phoneInput = useRef<RNTextInput>();
  const cityInput = useRef<RNTextInput>();
  const addressInput = useRef<RNTextInput>();

  const navigation = useNavigation();

  return (
    <Screen>
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          try {
            await user.update(values);
            navigation.goBack();
          } catch (error) {
            alert("Error", `Something went wrong: ${error.message}`);
            console.warn(error);
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => {
          return (
            <View paddingMedium>
              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall weightLight>
                  Username:
                </Text>
                <Text sizeSmall colorDanger>
                  {(touched.username && errors.username) ?? ""}
                </Text>
              </View>
              <Spacer small />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                keyboardType="default"
                spellCheck={false}
                textContentType="username"
                placeholder="Username"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                onSubmitEditing={emailInput.current?.focus}
              />

              <Spacer />

              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall weightLight>
                  Email:
                </Text>
                <Text sizeSmall colorDanger>
                  {(touched.email && errors.email) ?? ""}
                </Text>
              </View>
              <Spacer small />
              <TextInput
                ref={emailInput}
                {...textInputProps.email}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                onSubmitEditing={phoneInput.current?.focus}
              />

              <Spacer />

              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall weightLight>
                  Phone:
                </Text>
                <Text sizeSmall colorDanger>
                  {(touched.phone && errors.phone) ?? ""}
                </Text>
              </View>
              <Spacer small />
              <TextInput
                ref={phoneInput}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
                spellCheck={false}
                textContentType="telephoneNumber"
                placeholder="Phone"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                onSubmitEditing={cityInput.current?.focus}
              />

              <Spacer />

              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall weightLight>
                  City:
                </Text>
                <Text sizeSmall colorDanger>
                  {(touched.city && errors.city) ?? ""}
                </Text>
              </View>
              <Spacer small />
              <TextInput
                ref={cityInput}
                autoCapitalize="words"
                autoCorrect
                keyboardType="default"
                spellCheck
                textContentType="addressCity"
                placeholder="City"
                value={values.city}
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                onSubmitEditing={addressInput.current?.focus}
              />

              <Spacer />

              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall weightLight>
                  Address:
                </Text>
                <Text sizeSmall colorDanger>
                  {(touched.address && errors.address) ?? ""}
                </Text>
              </View>
              <Spacer small />
              <TextInput
                ref={addressInput}
                autoCapitalize="words"
                autoCorrect
                keyboardType="default"
                spellCheck
                textContentType="fullStreetAddress"
                placeholder="Address"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                onSubmitEditing={() => handleSubmit()}
              />

              <Spacer extraLarge />

              <Button title="SAVE" onPress={() => handleSubmit()} />
            </View>
          );
        }}
      </Formik>
    </Screen>
  );
});
