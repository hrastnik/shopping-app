import { Alert } from "react-native";

/**
 * returns a promise that resolves either with true or false, depending
 * on wheather the user accepts or dismisses the prompt
 */

const promptYesNo = (
  { title, message, yesText = "Yes", noText = "No" },
  alert = Alert.alert
): Promise<boolean> =>
  new Promise((resolve) => {
    alert(
      title,
      message,
      [
        { text: noText, style: "cancel", onPress: () => resolve(false) },
        { text: yesText, style: "default", onPress: () => resolve(true) },
      ],
      { cancelable: false, onDismiss: () => resolve(false) }
    );
  });

export { promptYesNo };
