import React, { useRef } from "react";
import { observer } from "mobx-react";
import * as yup from "yup";
import { Formik } from "formik";

import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { TextInput } from "~/components/TextInput";
import { Button } from "~/components/Button";
import { useAlert } from "~/components/AlertProvider";
import { textInputProps } from "~/utils/textInputProps";
import { useStore } from "~/mobx/useStore";

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .trim()
    .test({
      name: "username_test",
      test: (value: string) => Boolean(value.match(/^[A-Za-z0-9_-]+$/)),
      message: `Only alphanumberic characters, '-' and '_' allowed`
    }),
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
    .max(15, "Phone number too long")
});

export const SignUpScreen = observer(() => {
  const emailInput = useRef<any>();
  const passwordInput = useRef<any>();
  const phoneInput = useRef<any>();
  const alert = useAlert();

  const store = useStore();
  return (
    <Screen>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          username: "",
          email: "",
          password: "",
          phone: ""
        }}
        onSubmit={async values => {
          try {
            await store.authStore.register(values);
          } catch (error) {
            console.warn("error registering", error);
            alert("Error", "Something went wrong while creating a new user");
          }
        }}
      >
        {({
          touched,
          errors,
          values,
          handleChange: set,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => {
          return (
            <View paddingMedium>
              <View flexDirectionRow justifyContentSpaceBetween>
                <Text sizeSmall>Username</Text>
                <View absoluteTopRight>
                  <Text colorDanger sizeSmall>
                    {touched.username && errors.username}
                  </Text>
                </View>
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
                onChangeText={set("username")}
                onBlur={handleBlur("username")}
                onSubmitEditing={emailInput?.current?.focus}
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
                {...textInputProps.email}
                ref={emailInput}
                value={values.email}
                onChangeText={set("email")}
                onBlur={handleBlur("email")}
                onSubmitEditing={phoneInput?.current?.focus}
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
                {...textInputProps.phoneNumber}
                ref={phoneInput}
                value={values.phone}
                onChangeText={set("phone")}
                onBlur={handleBlur("phone")}
                onSubmitEditing={passwordInput?.current?.focus}
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
                {...textInputProps.password}
                ref={passwordInput}
                value={values.password}
                onChangeText={set("password")}
                onBlur={handleBlur("password")}
                onSubmitEditing={() => handleSubmit()}
              />

              <Spacer extraLarge />

              <Button
                title="SUBMIT"
                disabled={isSubmitting}
                onPress={() => handleSubmit()}
              />
            </View>
          );
        }}
      </Formik>
    </Screen>
  );
});
