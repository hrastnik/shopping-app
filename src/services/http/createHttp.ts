import Axios from "axios";

import { addToken } from "./addToken.interceptor";
import { requestLogger } from "./requestLogger.interceptor";
import { responseLogger } from "./responseLogger.interceptor";
import { errorLogger } from "./errorLogger.interceptor";

export function createHttp(axios = Axios) {
  const state = { token: undefined };

  const http = axios.create({
    baseURL: undefined
  });

  http.interceptors.request.use(addToken(() => state.token));
  http.interceptors.request.use(requestLogger);
  http.interceptors.response.use(responseLogger, errorLogger);

  return http;
}

export interface HttpStatic extends ReturnType<typeof createHttp> {}
