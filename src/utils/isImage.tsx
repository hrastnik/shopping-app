import _ from "lodash";

const supportedExtensions = ["jpg", "jpeg", "png", "tiff", "gif", "bmp"];

function isImage(media) {
  if (typeof media !== "string") return false;

  const ext = _.last(media.split("."));

  if (supportedExtensions.includes(ext.toLowerCase())) return true;

  return false;
}

export { isImage };
