import React from "react";
import { observer } from "mobx-react";
import * as yup from "yup";
import { Formik } from "formik";

import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { constants } from "~/style";
import { Spacer } from "~/components/Spacer";
import { useStore } from "~/mobx/useStore";
import { IconButton } from "~/components/IconButton";
import { MeasureLayout } from "~/components/MeasureLayout";
import { useRightComponent } from "~/components/Header";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "~/components/TextInput";
import { values } from "mobx";
import { Button } from "~/components/Button";

const validationSchema = yup.object({
  username: yup.string().required("Username can't be empty"),
  email: yup.string().email("Email format is invalid")
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
                weightBold
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
                weightBold
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
