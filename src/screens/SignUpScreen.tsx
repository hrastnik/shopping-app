import React, { useRef, useCallback } from "react";
import { TextInput as RNTextInput } from "react-native";
import { observer } from "mobx-react";
import * as yup from "yup";
import { useFormik } from "formik";

import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { TextInput } from "~/components/TextInput";
import { Button } from "~/components/Button";
import { useAlert } from "~/components/AlertProvider";
import { useStore } from "~/mobx/useStore";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .max(64, "First name is too long")
    .trim(),
  lastName: yup
    .string()
    .required("Last name is required")
    .max(64, "Last name is too long")
    .trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Email format is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password too short"),
  phone: yup
    .string()
    .required("Phone number is required")
    .min(6, "Phone number too short")
    .max(15, "Phone number too long"),
  city: yup.string().required("City is required").max(96, "City is too long"),
  address: yup
    .string()
    .required("Adderss is required")
    .max(128, "Adderss is too long"),
});

export const SignUpScreen = observer(() => {
  const lastNameInput = useRef<RNTextInput>();
  const emailInput = useRef<RNTextInput>();
  const passwordInput = useRef<RNTextInput>();
  const phoneInput = useRef<RNTextInput>();
  const cityInput = useRef<RNTextInput>();
  const addressInput = useRef<RNTextInput>();
  const alert = useAlert();

  const store = useStore();

  const {
    touched,
    errors,
    values,
    handleChange: set,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik(
    useRef({
      validationSchema,
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        address: "",
      },
      async onSubmit(values, { setErrors }) {
        try {
          await store.authStore.register(values);

          await store.authStore.login({
            email: values.email,
            password: values.password,
          });
        } catch (error) {
          if (error.response?.status === 409) {
            setErrors({ email: "Email address already in use" });
          } else {
            console.warn("error registering", error);
            console.warn(error.response?.data?.error?.message);
            alert("Error", "Something went wrong while creating a new user");
          }
        }
      },
    }).current
  );

  return (
    <Screen>
      <View paddingMedium>
        <View flexDirectionRow justifyContentSpaceBetween>
          <Text sizeSmall>First name</Text>
          <View absoluteTopRight>
            <Text colorDanger sizeSmall>
              {touched.firstName && errors.firstName}
            </Text>
          </View>
        </View>
        <Spacer small />
        <TextInput
          autoFocus
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          spellCheck={false}
          textContentType="givenName"
          placeholder="John"
          value={values.firstName}
          onChangeText={useCallback(set("firstName"), [])}
          onBlur={useCallback(handleBlur("firstName"), [])}
          onSubmitEditing={lastNameInput.current?.focus}
        />
        <Spacer />

        <View flexDirectionRow justifyContentSpaceBetween>
          <Text sizeSmall>Last name</Text>
          <View absoluteTopRight>
            <Text colorDanger sizeSmall>
              {touched.lastName && errors.lastName}
            </Text>
          </View>
        </View>
        <Spacer small />
        <TextInput
          ref={lastNameInput}
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          spellCheck={false}
          textContentType="familyName"
          placeholder="Doe"
          value={values.lastName}
          onChangeText={useCallback(set("lastName"), [])}
          onBlur={useCallback(handleBlur("lastName"), [])}
          blurOnSubmit={false}
          onSubmitEditing={emailInput.current?.focus}
        />
        <Spacer />

        <View flexDirectionRow justifyContentSpaceBetween>
          <Text sizeSmall>Email</Text>
          <View absoluteTopRight>
            <Text colorDanger sizeSmall>
              {touched.email && errors.email}
            </Text>
          </View>
        </View>
        <Spacer small />
        <TextInput
          ref={emailInput}
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect
          dataDetectorTypes="none"
          keyboardType="email-address"
          maxLength={50}
          placeholder="Email"
          secureTextEntry={false}
          value={values.email}
          onChangeText={useCallback(set("email"), [])}
          onBlur={useCallback(handleBlur("email"), [])}
          blurOnSubmit={false}
          onSubmitEditing={phoneInput.current?.focus}
        />
        <Spacer />

        <View flexDirectionRow justifyContentSpaceBetween>
          <Text sizeSmall>Phone number</Text>
          <View absoluteTopRight>
            <Text colorDanger sizeSmall>
              {touched.phone && errors.phone}
            </Text>
          </View>
        </View>
        <Spacer small />
        <TextInput
          ref={phoneInput}
          placeholder="55512345"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          maxLength={16}
          spellCheck={false}
          value={values.phone}
          onChangeText={useCallback(set("phone"), [])}
          onBlur={useCallback(handleBlur("phone"), [])}
          blurOnSubmit={false}
          onSubmitEditing={passwordInput.current?.focus}
        />
        <Spacer />

        <View flexDirectionRow justifyContentSpaceBetween>
          <Text sizeSmall>Password</Text>
          <View absoluteTopRight>
            <Text colorDanger sizeSmall>
              {touched.password && errors.password}
            </Text>
          </View>
        </View>
        <Spacer small />
        <TextInput
          ref={passwordInput}
          placeholder="********"
          autoCapitalize="none"
          secureTextEntry
          spellCheck={false}
          textContentType="password"
          value={values.password}
          onChangeText={useCallback(set("password"), [])}
          onBlur={useCallback(handleBlur("password"), [])}
          blurOnSubmit={false}
          onSubmitEditing={cityInput.current?.focus}
        />
        <Spacer />

        <View flexDirectionRow justifyContentSpaceBetween>
          <Text sizeSmall>City</Text>
          <View absoluteTopRight>
            <Text colorDanger sizeSmall>
              {touched.city && errors.city}
            </Text>
          </View>
        </View>
        <Spacer small />
        <TextInput
          ref={cityInput}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          spellCheck={false}
          textContentType="addressCity"
          placeholder="London"
          value={values.city}
          onChangeText={useCallback(set("city"), [])}
          onBlur={useCallback(handleBlur("city"), [])}
          blurOnSubmit={false}
          onSubmitEditing={addressInput.current?.focus}
        />
        <Spacer />

        <View flexDirectionRow justifyContentSpaceBetween>
          <Text sizeSmall>Address</Text>
          <View absoluteTopRight>
            <Text colorDanger sizeSmall>
              {touched.address && errors.address}
            </Text>
          </View>
        </View>
        <Spacer small />
        <TextInput
          ref={cityInput}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          spellCheck={false}
          textContentType="fullStreetAddress"
          placeholder="Baker Street 221B"
          value={values.address}
          onChangeText={useCallback(set("address"), [])}
          onBlur={useCallback(handleBlur("address"), [])}
          blurOnSubmit={false}
          onSubmitEditing={() => handleSubmit()}
        />
        <Spacer />

        <Spacer extraLarge />

        <Button
          title="SUBMIT"
          disabled={isSubmitting}
          onPress={() => handleSubmit()}
        />
      </View>
    </Screen>
  );
});
