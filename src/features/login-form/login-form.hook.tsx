import { useRef, useCallback } from "react";
import { TextInput as RNTextInput } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";

import { environment } from "~/environment";
import { useStore } from "~/mobx/useStore";

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

export interface UseLoginFormProps {
  onSuccess?: () => any;
}

export function useLoginForm({ onSuccess }: UseLoginFormProps) {
  const store = useStore();

  const {
    setFieldValue,
    setFieldTouched,
    submitForm,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: environment.LOGIN_SCREEN_INITIAL_EMAIL,
      password: environment.LOGIN_SCREEN_INITIAL_PASSWORD,
    },
    validationSchema,
    async onSubmit(values, { setErrors }) {
      try {
        await store.authStore.login({
          email: values.email,
          password: values.password,
        });

        onSuccess();
        // Router responds change in isLogged in and updates the active screen
      } catch (error) {
        if (error.response?.data.error.code === 100) {
          setErrors({
            email: " ",
            password: "Wrong username or password",
          });
          return;
        }

        console.warn("error logging in", error);

        setErrors({
          email: " ",
          password: "Something went wrong",
        });
      }
    },
  });

  const refs = {
    password: useRef<RNTextInput>(),
  };

  return {
    fields: {
      email: {
        hasError: Boolean(touched.email && errors.email),
        error: (touched.email && errors.email) ?? " ",
        onBlur: useCallback(() => setFieldTouched("email"), [setFieldTouched]),
        onChangeText: useCallback((text) => setFieldValue("email", text), [
          setFieldValue,
        ]),
        onSubmitEditing: () => refs.password.current.focus(),
        value: values.email,
      },
      password: {
        ref: refs.password,
        hasError: Boolean(touched.password && errors.password),
        error: (touched.password && errors.password) ?? " ",
        onBlur: useCallback(() => setFieldTouched("password"), [
          setFieldTouched,
        ]),
        onChangeText: useCallback((text) => setFieldValue("password", text), [
          setFieldValue,
        ]),
        onSubmitEditing: submitForm,
        value: values.password,
      },
    },
    submitForm,
    isSubmitting,
  };
}
