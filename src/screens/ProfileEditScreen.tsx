import React from "react";
import { observer } from "mobx-react";
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
  const user = store.authStore.activeUser;

  const initialValues = {
    username: user.username,
    email: user.email
  };

  return (
    <Screen>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          user.update(values);
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
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
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
                {...textInputProps.email}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />

              <Spacer extraLarge />

              <Button title="SAVE" onPress={async () => handleSubmit()} />
            </View>
          );
        }}
      </Formik>
    </Screen>
  );
});
