import { TextInputProps } from "~/components/TextInput";

export const textInputProps = {
  email: {
    autoCapitalize: "none",
    autoCompleteType: "email",
    autoCorrect: true,
    dataDetectorTypes: "none",
    keyboardType: "email-address",
    maxLength: 50,
    placeholder: "Email",
    secureTextEntry: false,
    spellCheck: false,
    textContentType: "emailAddress",
  } as TextInputProps,

  password: {
    placeholder: "Password",
    autoCapitalize: "none",
    secureTextEntry: true,
    spellCheck: false,
    textContentType: "password",
  } as TextInputProps,

  phoneNumber: {
    placeholder: "Phone",
    keyboardType: "phone-pad",
    textContentType: "telephoneNumber",
    maxLength: 16,
    spellCheck: false,
  } as TextInputProps,

  name: {
    placeholder: "First and Last Name",
    keyboardType: "default",
    textContentType: "givenName",
    autoCapitalize: "words",
    maxLength: 50,
    spellCheck: false,
  } as TextInputProps,
};
