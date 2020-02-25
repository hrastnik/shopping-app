import { types, flow, getEnv } from "mobx-state-tree";
import _ from "lodash";
import { AxiosResponse } from "axios";

import { User } from "~/mobx/entities/user/User";
import { Environment } from "~/mobx/createStore";

export const UserStore = types
  .model("UserStore", {
    map: types.map(User)
  })
  .actions(self => {
    return {
      processUserList(data) {
        for (const entity of _.castArray(data)) {
          self.map.put(entity);
        }
      }
    };
  })
  .actions(self => {
    return {
      createUser: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(`/users`, params);
        self.processUserList(response.data);
      }),

      readUserList: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/users`, {
          params
        });
        self.processUserList(response.data);
      }),

      readUser: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/users/${id}`, {
          params
        });
        self.processUserList(response.data);
      }),

      updateUser: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/users/${id}`,
          params
        );
        self.processUserList(response.data);
      }),

      deleteUser: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/users/${id}`,
          params
        );
        self.processUserList(response.data);
      })
    };
  });
