import { useRef, useCallback } from "react";
import { TextInput as RNTextInput } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";

import { useStore } from "~/mobx/useStore";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email format is invalid"),
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

export interface UseUpdateAccountFormProps {
  onSuccess?: () => any;
}

export function useUpdateAccountForm({ onSuccess }: UseUpdateAccountFormProps) {
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
      email: store.authStore.activeUser.email,
      firstName: store.authStore.activeUser.firstName,
      lastName: store.authStore.activeUser.lastName,
      phone: store.authStore.activeUser.phone,
      city: store.authStore.activeUser.city,
      address: store.authStore.activeUser.address,
    },
    validationSchema,
    async onSubmit(values, { setErrors }) {
      try {
        await store.authStore.activeUser.update(values);
        onSuccess();
      } catch (error) {
        console.warn("error updating user", error);
        console.warn(error.response?.data?.error?.message);
        setErrors({
          email: " ",
          firstName: " ",
          lastName: " ",
          phone: " ",
          city: " ",
          address: "Something went wrong.",
        });
      }
    },
  });

  const refs = {
    firstName: useRef<RNTextInput>(),
    lastName: useRef<RNTextInput>(),
    phone: useRef<RNTextInput>(),
    city: useRef<RNTextInput>(),
    address: useRef<RNTextInput>(),
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
        onSubmitEditing: () => refs.firstName.current.focus(),
        value: values.email,
      },
      firstName: {
        hasError: Boolean(touched.firstName && errors.firstName),
        error: (touched.firstName && errors.firstName) ?? " ",
        onBlur: useCallback(() => setFieldTouched("firstName"), [
          setFieldTouched,
        ]),
        onChangeText: useCallback((text) => setFieldValue("firstName", text), [
          setFieldValue,
        ]),
        onSubmitEditing: () => refs.lastName.current.focus(),
        value: values.firstName,
      },
      lastName: {
        hasError: Boolean(touched.lastName && errors.lastName),
        error: (touched.lastName && errors.lastName) ?? " ",
        onBlur: useCallback(() => setFieldTouched("lastName"), [
          setFieldTouched,
        ]),
        onChangeText: useCallback((text) => setFieldValue("lastName", text), [
          setFieldValue,
        ]),
        onSubmitEditing: () => refs.phone.current.focus(),
        value: values.lastName,
      },
      phone: {
        hasError: Boolean(touched.phone && errors.phone),
        error: (touched.phone && errors.phone) ?? " ",
        onBlur: useCallback(() => setFieldTouched("phone"), [setFieldTouched]),
        onChangeText: useCallback((text) => setFieldValue("phone", text), [
          setFieldValue,
        ]),
        onSubmitEditing: () => refs.city.current.focus(),
        value: values.phone,
      },
      city: {
        hasError: Boolean(touched.city && errors.city),
        error: (touched.city && errors.city) ?? " ",
        onBlur: useCallback(() => setFieldTouched("city"), [setFieldTouched]),
        onChangeText: useCallback((text) => setFieldValue("city", text), [
          setFieldValue,
        ]),
        onSubmitEditing: () => refs.address.current.focus(),
        value: values.city,
      },
      address: {
        hasError: Boolean(touched.address && errors.address),
        error: (touched.address && errors.address) ?? " ",
        onBlur: useCallback(() => setFieldTouched("address"), [
          setFieldTouched,
        ]),
        onChangeText: useCallback((text) => setFieldValue("address", text), [
          setFieldValue,
        ]),
        onSubmitEditing: submitForm,
        value: values.address,
      },
    },
    submitForm,
    isSubmitting,
  };
}
