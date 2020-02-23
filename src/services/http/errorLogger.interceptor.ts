import Axios from "axios";

export function errorLogger(error) {
  // Do not log cancelled errors
  if (Axios.isCancel(error)) throw error;

  const url = error?.config?.url ?? "UNKNOWN_URL";

  console.log(`Network error accessing ${url}! Logged to console`);

  console.log("Error message:", error.message);
  console.log("Error request:", error.request);
  console.log("Error response:", error.response);
  console.log("Error config:", error.config);

  throw error;
}
