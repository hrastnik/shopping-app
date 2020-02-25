import { types, flow, getEnv } from "mobx-state-tree";
import _ from "lodash";
import { AxiosResponse } from "axios";

import { Shop } from "~/mobx/entities/shop/Shop";
import { Environment } from "~/mobx/createStore";

export const ShopStore = types
  .model("ShopStore", {
    map: types.map(Shop)
  })
  .actions(self => {
    return {
      processShopList(data) {
        for (const entity of _.castArray(data)) {
          self.map.put(entity);
        }
      }
    };
  })
  .actions(self => {
    return {
      createShop: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(`/shops`, params);
        self.processShopList(response.data);
      }),

      readShopList: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/shops`, {
          params
        });
        self.processShopList(response.data);
      }),

      readShop: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/shops/${id}`, {
          params
        });
        self.processShopList(response.data);
      }),

      updateShop: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/shops/${id}`,
          params
        );
        self.processShopList(response.data);
      }),

      deleteShop: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/shops/id`,
          params
        );
        self.processShopList(response.data);
      })
    };
  });
