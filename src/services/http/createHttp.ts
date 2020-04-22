import Axios from "axios";

import { requestLogger } from "./requestLogger.interceptor";
import { responseLogger } from "./responseLogger.interceptor";
import { errorLogger } from "./errorLogger.interceptor";

export function createHttp(axios = Axios) {
  const http = axios.create({
    baseURL: "http://192.168.1.102:8080/directus/"
  });

  http.interceptors.request.use(requestLogger);
  http.interceptors.response.use(responseLogger, errorLogger);

  return http;
}

export interface HttpStatic extends ReturnType<typeof createHttp> {}
