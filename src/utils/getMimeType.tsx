function getMimeType(uri) {
  const extension = uri.split(".").pop() || "";

  const knownMimeType = {
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    flv: "video/x-flv",
    mp4: "video/mp4",
    "3gp": "video/3gpp",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    wmv: "video/x-ms-wmv",
  }[extension.toLowerCase()];

  const mimeType = knownMimeType || "application/octet-stream";

  return mimeType;
}

export { getMimeType };
