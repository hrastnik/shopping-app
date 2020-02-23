function getFileExtension(file) {
  return file.split(".").pop() || "";
}

export { getFileExtension };
