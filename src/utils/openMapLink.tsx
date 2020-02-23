import { Platform, Linking } from "~core/components";

function openMapLink({
  latitude,
  longitude,
  formattedAddress = "Unknown Location"
}) {
  const resolvedScheme =
    Platform.OS === "ios"
      ? `http://maps.apple.com/?ll=${latitude},${longitude}&q=${formattedAddress}`
      : `geo:${latitude},${longitude}?q=${formattedAddress}`;

  if (latitude && longitude) {
    Linking.openURL(resolvedScheme);
  }
}

export { openMapLink };
