import { types, flow, getEnv } from "mobx-state-tree";
import _ from "lodash";
import { AxiosResponse } from "axios";

import { Shop } from "~/mobx/entities/shop/Shop";
import { Environment } from "~/mobx/createStore";

export const ShopStore = types
  .model("ShopStore", {
    map: types.map(Shop),
  })
  .actions((self) => {
    return {
      processShopList(data) {
        for (const entity of _.castArray(data)) {
          if (typeof entity.region === "object") {
            entity.region = entity.region.id;
          }
          self.map.put(entity);
        }
      },
    };
  })
  .actions((self) => {
    return {
      readShopList: flow(function* (params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/items/shop`, {
          params: { ...params, fields: "*,image.filename_disk" },
        });
        self.processShopList(response.data.data);
        return response;
      }),

      readShop: flow(function* (id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(
          `/items/shop/${id}`,
          {
            params: { ...params, fields: "*,image.filename_disk" },
          }
        );
        self.processShopList(response.data.data);
        return response;
      }),
    };
  });
