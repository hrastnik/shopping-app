import { Platform } from "react-native";
import _ from "lodash";

const supportedExtensions = Platform.select({
  ios: ["mp4", "3gp", "mov", "m4v"],
  android: ["mp4", "3gp", "webm", "mov"],
});

export function isVideo(media) {
  if (typeof media !== "string") return false;

  const ext = _.last(media.split("."));

  if (supportedExtensions.includes(ext.toLowerCase())) return true;

  return false;
}
