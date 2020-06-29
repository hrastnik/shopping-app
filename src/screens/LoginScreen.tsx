import React, { useState, useRef } from "react";
import { TextInput as RNTextInput } from "react-native";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";

import { TextInput } from "~/components/TextInput";
import { Text } from "~/components/Text";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { useStore } from "~/mobx/useStore";
import { Spacer } from "~/components/Spacer";
import { environment } from "~/environment";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email format is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password too short"),
});

export const LoginScreen = observer(() => {
  const store = useStore();
  const navigation = useNavigation();

  const [error, setError] = useState(undefined);

  const passwordInput = useRef<RNTextInput>();

  return (
    <Screen>
      <Formik
        initialValues={{
          email: environment.LOGIN_SCREEN_INITIAL_EMAIL,
          password: environment.LOGIN_SCREEN_INITIAL_PASSWORD,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            setError(undefined);
            await store.authStore.login({
              email: values.email,
              password: values.password,
            });
            // navigation.navigate("RegionListScreen");
          } catch (error) {
            setError(error.message);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => {
          return (
            <View paddingMedium justifyContentCenter>
              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall>Email</Text>
                <Text colorDanger sizeSmall>
                  {touched.email && errors.email}
                </Text>
              </View>
              <Spacer small />
              <TextInput
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect
                autoFocus
                dataDetectorTypes="none"
                keyboardType="email-address"
                maxLength={50}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                onSubmitEditing={passwordInput.current?.focus}
                placeholder="Email"
                secureTextEntry={false}
                value={values.email}
              />
              <Spacer />
              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall>Password</Text>
                <Text colorDanger sizeSmall>
                  {touched.password && errors.password}
                </Text>
              </View>
              <Spacer small />
              <TextInput
                ref={passwordInput}
                autoCapitalize="none"
                secureTextEntry
                spellCheck={false}
                textContentType="password"
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                onSubmitEditing={() => {
                  return handleSubmit();
                }}
              />
              <Spacer />

              {error && <Text>{error}</Text>}

              <Spacer extraLarge />

              <Button
                disabled={isSubmitting}
                title="SUBMIT"
                onPress={() => handleSubmit()}
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
          );
        }}
      </Formik>
    </Screen>
  );
});
