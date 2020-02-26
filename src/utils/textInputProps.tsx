import { TextInputProps } from "~/components/TextInput";

export const textInputProps: Record<string, TextInputProps> = {
  email: {
    placeholder: "Email",
    keyboardType: "email-address",
    textContentType: "emailAddress",
    autoCapitalize: "none",
    maxLength: 50,
    spellCheck: false
  },

  password: {
    placeholder: "Password",
    autoCapitalize: "none",
    secureTextEntry: true,
    spellCheck: false,
    textContentType: "password"
  },

  phoneNumber: {
    placeholder: "Phone",
    keyboardType: "phone-pad",
    textContentType: "telephoneNumber",
    maxLength: 16,
    spellCheck: false
  },

  name: {
    placeholder: "First and Last Name",
    keyboardType: "default",
    textContentType: "givenName",
    autoCapitalize: "words",
    maxLength: 50,
    spellCheck: false
  }
};
