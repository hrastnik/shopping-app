import {
  types,
  flow,
  getEnv,
  Instance,
  SnapshotIn,
  SnapshotOut
} from "mobx-state-tree";

import { getRoot } from "./utils/getRoot";
import { Environment } from "./createStore";
import { User } from "./entities/user/User";
import { autorun } from "mobx";
import { AxiosRequestConfig } from "axios";
import { delay } from "~/utils/delay";

export interface AuthStoreInstance extends Instance<typeof AuthStore> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStore> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStore> {}

export const AuthStore = types
  .model("AuthStore", {
    activeUser: types.safeReference(User),
    token: types.maybe(types.string)
  })
  .actions(self => {
    return {
      processAuthUser(data) {
        const root = getRoot(self);
        root.userStore.processUserList(data.user);
        self.token = data.jwt;
      }
    };
  })
  .views(self => {
    return {
      get isLoggedIn() {
        return self.token !== undefined && self.activeUser != null;
      }
    };
  })
  .actions(self => {
    return {
      login: flow(function*(params: {
        identifier: string;
        password: string;
      }): any {
        const env: Environment = getEnv(self);

        const authorization = env.http.defaults.headers.authorization;
        delete env.http.defaults.headers.authorization;

        try {
          const response = yield env.http.post("/auth/local", params);
          env.http.defaults.headers.authorization = authorization;

          const root = getRoot(self);
          root.userStore.processUserList(response.data.user);

          self.activeUser = response.data.user.id;
          self.token = response.data.jwt;
        } catch (error) {
          env.http.defaults.headers.authorization = authorization;
          throw error;
        }
      }),

      register: flow(function*(params: {
        username: string;
        email: string;
        password: string;
      }): any {
        const env: Environment = getEnv(self);
        const response = yield env.http.post("/auth/local/register", params);
        const root = getRoot(self);
        root.userStore.processUserList(response.data.user);
        self.activeUser = response.data.user.id;
        self.token = response.data.jwt;
      }),

      me: flow(function*(config?: AxiosRequestConfig): any {
        const env: Environment = getEnv(self);
        const response = yield env.http.get("/users/me", config);

        const root = getRoot(self);
        root.userStore.processUserList(response.data);
        self.activeUser = response.data.id;
      })
    };
  })
  .actions(self => {
    return {
      afterAttach: flow(function*(): any {
        const env: Environment = getEnv(self);
        const root = getRoot(self);
        self.token = yield env.persistence.get("token");

        autorun(() => {
          if (self.token === undefined) {
            delete env.http.defaults.headers.authorization;
          } else {
            env.http.defaults.headers.authorization = `Bearer ${self.token}`;
          }
        });

        autorun(() => {
          env.persistence.set("token", self.token);
        });

        if (self.token) {
          try {
            yield delay(0); // wait for token to set
            yield self.me();
            root.uiStore.set("initialScreen", "RegionList");
          } catch (error) {
            console.warn("error /me", error);
            root.uiStore.set("initialScreen", "LoginScreen");
          }
        } else {
          root.uiStore.set("initialScreen", "LoginScreen");
        }
      })
    };
  });
