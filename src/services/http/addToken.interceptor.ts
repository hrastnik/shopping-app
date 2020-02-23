import { AxiosRequestConfig } from "axios";

export function addToken(getToken: () => string) {
  return (config: AxiosRequestConfig) => {
    const token = getToken();
    if (typeof token !== "string") return config;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  };
}
