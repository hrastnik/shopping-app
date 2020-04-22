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
          entity.images = entity.images.map(data => {
            return {
              url: data.image.data.full_url
            };
          });
          self.map.put(entity);
        }
      }
    };
  })
  .actions(self => {
    return {
      createShop: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/items/shop`,
          params
        );
        self.processShopList(response.data.data);
        return response;
      }),

      readShopList: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/items/shop`, {
          params: { ...params, fields: "*,images.image.data" }
        });
        self.processShopList(response.data.data);
        return response;
      }),

      readShop: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(
          `/items/shop/${id}`,
          {
            params
          }
        );
        self.processShopList(response.data.data);
        return response;
      }),

      updateShop: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/items/shop/${id}`,
          params
        );
        self.processShopList(response.data.data);
        return response;
      }),

      deleteShop: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/items/shop/id`,
          params
        );
        self.processShopList(response.data.data);
        return response;
      })
    };
  });
