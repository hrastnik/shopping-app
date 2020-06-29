import { PermissionsAndroid, Platform } from "~core/components";
import { promptYesNo } from ".";

/**
 *
 * @param {array} permissions - Array of object of shape { type, title, message, error }
 *
 * returns { permissionsGranted: bool, error: oneOf(undefined, string) }
 */
const requestPermissions = async (permissions) => {
  if (Platform.OS !== "android") {
    return { permissionsGranted: true, error: undefined };
  }

  try {
    for (let i = 0; i < permissions.length; i += 1) {
      const permission = permissions[i];
      const { type, title, message, error } = permission;

      const alreadyGranted = await PermissionsAndroid.check(type);

      if (alreadyGranted === true) {
        continue;
      }

      try {
        await promptYesNo({
          title,
          message,
          yesText: "ACCEPT",
          noText: "REJECT",
        });
      } catch (error) {
        throw new Error(error || "Additional permission required!");
      }

      const granted = await PermissionsAndroid.request(type, {
        message,
        title,
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Reject",
        buttonPositive: "Accept",
      });

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error(error || "Additional permission required");
      }
    }

    return { permissionsGranted: true, error: undefined };
  } catch (error) {
    return { permissionsGranted: false, error: error.message };
  }
};

export { requestPermissions };
