import {
  types,
  flow,
  getEnv,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import { Image as RNImage } from "react-native";

import { getRoot } from "./utils/getRoot";
import { Environment } from "./createStore";
import { User } from "./entities/user/User";
import { autorun, when } from "mobx";
import { AxiosRequestConfig } from "axios";
import { delay } from "~/utils/delay";

export interface AuthStoreInstance extends Instance<typeof AuthStore> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStore> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStore> {}

export const AuthStore = types
  .model("AuthStore", {
    activeUser: types.safeReference(User),
    token: types.maybe(types.string),
  })
  .actions((self) => {
    return {
      processAuthUser(data) {
        const root = getRoot(self);
        root.userStore.processUserList(data.user);
        self.token = data.jwt;
      },
    };
  })
  .views((self) => {
    return {
      get isLoggedIn() {
        return self.token !== undefined && self.activeUser != null;
      },
    };
  })
  .actions((self) => {
    return {
      afterLogin: flow(function* (): any {
        const root = getRoot(self);

        // Prefetch categories
        yield root.categoryStore.readCategoryList({});
        for (const category of root.categoryStore.map.values()) {
          RNImage.prefetch(category.image.source.uri);
        }
      }),
    };
  })
  .actions((self) => {
    return {
      login: flow(function* (params: { email: string; password: string }): any {
        const env: Environment = getEnv(self);

        const authorization = env.http.defaults.headers.authorization;
        delete env.http.defaults.headers.authorization;

        try {
          const response = yield env.http.post("/auth/authenticate", params);
          // Directus has a bug where numberic id is returned as string
          if (typeof response.data.data.user.id === "string") {
            response.data.data.user.id = parseInt(
              response.data.data.user.id,
              10
            );
          }

          env.http.defaults.headers.authorization = authorization;

          const token = response.data.data.token;
          const user = {
            id: response.data.data.user.id,
            firstName: response.data.data.user.first_name,
            lastName: response.data.data.user.last_name,
            email: response.data.data.user.email,
            phone: response.data.data.user.phone,
            city: response.data.data.user.city,
            address: response.data.data.user.address,
          };

          const root = getRoot(self);
          root.userStore.processUserList(user);

          self.activeUser = user.id;
          self.token = token;

          yield self.afterLogin();
        } catch (error) {
          env.http.defaults.headers.authorization = authorization;
          throw error;
        }
      }),

      logout() {
        const root = getRoot(self);
        self.activeUser = undefined;
        self.token = undefined;
        root.cartStore.clearCart();
        root.cartStore.address = "";
        root.cartStore.city = "";
        root.uiStore.favoriteProductMap.clear();
      },

      register: flow(function* (params: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        city: string;
        address: string;
      }): any {
        const env: Environment = getEnv(self);
        const response = yield env.http.post(
          "/users",
          {
            first_name: params.firstName,
            last_name: params.lastName,
            email: params.email,
            phone: params.phone,
            city: params.city,
            address: params.address,
            password: params.password,
            status: "active",
            role: 4,
          },
          {
            params: {
              fields: [
                "id",
                "first_name",
                "last_name",
                "email",
                "phone",
                "city",
                "address",
              ].join(","),
            },
          }
        );

        yield self.afterLogin();

        return response;
      }),

      me: flow(function* (config?: AxiosRequestConfig): any {
        const env: Environment = getEnv(self);
        const response = yield env.http.get("/users/me", {
          ...config,
          params: {
            fields: [
              "id",
              "first_name",
              "last_name",
              "email",
              "phone",
              "city",
              "address",
            ].join(","),
          },
        });

        const user = {
          id: response.data.data.id,
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name,
          email: response.data.data.email,
          phone: response.data.data.phone,
          city: response.data.data.city,
          address: response.data.data.address,
        };

        const root = getRoot(self);
        root.userStore.processUserList(user);

        self.activeUser = user.id;
      }),

      refreshToken: flow(function* (): any {
        const env: Environment = getEnv(self);
        const response = yield env.http.post("/auth/refresh", {
          token: self.token,
        });

        const token = response.data.data.token;

        self.token = token;
      }),
    };
  })
  .actions((self) => {
    return {
      afterAttach: flow(function* (): any {
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

        // Refresh access token every 30 seconds
        when(
          () => Boolean(self.token && self.activeUser),
          () => {
            const intervalId = setInterval(() => {
              self.refreshToken();
            }, 30000);
            when(
              () => !self.token,
              () => {
                clearInterval(intervalId);
              }
            );
          }
        );

        if (self.token) {
          try {
            yield delay(0); // wait for token to set
            yield self.me();
            yield self.afterLogin();
            root.uiStore.set("initialScreen", "RegionList");
          } catch (error) {
            console.warn("error /me", error);
            root.uiStore.set("initialScreen", "LoginScreen");
          }
        } else {
          root.uiStore.set("initialScreen", "LoginScreen");
        }
      }),
    };
  });
