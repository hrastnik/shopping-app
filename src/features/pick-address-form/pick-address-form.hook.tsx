import {
  useRef,
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { TextInput as RNTextInput } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import _, { add } from "lodash";

import React, { useRef } from "react";
import { observer } from "mobx-react";
import { TextInput as RNTextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
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

function useDetectAddress() {
  const [address, setAddress] = useState<{ city: string; address: string }>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const detectAddress = async () => {
    setIsLoading(true);
    try {
      const result = await Location.requestPermissionsAsync();
      if (!result.granted) {
        console.warn("permissions not granted");

        return;
      }
      const position = await Location.getCurrentPositionAsync();

      const [location] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      const { city, name, postalCode, region, street } = location;

      setAddress({
        city: `${city}, ${region} (${postalCode})`,
        address: `${street}, ${name}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { detectAddress, isLoading, address };
}

const validationSchema = yup.object({
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
});

export interface UsePickAddressFormProps {
  initialValues: Required<yup.InferType<typeof validationSchema>>;
  onAccept?: (values: Required<yup.InferType<typeof validationSchema>>) => any;
}

export function usePickAddressForm({
  initialValues,
  onAccept,
}: UsePickAddressFormProps) {
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
      city: initialValues.city,
      address: initialValues.address,
    },
    validationSchema,
    async onSubmit(values) {
      onAccept(values);
    },
  });

  const {
    address: detectedAddress,
    detectAddress,
    isLoading: isDetectingAddress,
  } = useDetectAddress();

  // Sync picked address
  useEffect(() => {
    const shouldSync =
      detectedAddress !== undefined && !_.isEqual(address, values);

    if (shouldSync) {
      setFieldValue("address", detectAddress);
    }
  });

  const refs = {
    address: useRef<RNTextInput>(),
  };

  return {
    fields: {
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
        ref: refs.address,
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
    detectAddress,
    isDetectingAddress,
  };
}
