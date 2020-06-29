import {
  types,
  flow,
  getEnv,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import _ from "lodash";
import { AxiosResponse } from "axios";

import { Product } from "~/mobx/entities/product/Product";
import { Environment } from "~/mobx/createStore";
import { getRoot } from "~/mobx/utils/getRoot";
import { preprocess } from "~/mobx/utils/preprocess";

export interface ProductStoreInstance extends Instance<typeof ProductStore> {}
export interface ProductStoreSnapshotIn
  extends SnapshotIn<typeof ProductStore> {}
export interface ProductStoreSnapshotOut
  extends SnapshotOut<typeof ProductStore> {}

export const ProductStore = types
  .model("ProductStore", {
    map: types.map(Product),
  })
  .actions((self) => {
    return {
      processProductList(data) {
        const root = getRoot(self);

        for (const entity of _.castArray(data)) {
          if (Array.isArray(entity.image_list)) {
            entity.images = entity.image_list.map(
              (wrapper) => wrapper.image_id
            );
          }

          if (Array.isArray(entity.category_list)) {
            entity.categories = entity.category_list.map(
              (wrapper) => wrapper.category_id
            );
          }

          if (typeof entity.shop === "object") {
            const keyList = Object.keys(entity.shop);
            const numKeys = keyList.length;

            if (numKeys === 1) {
              entity.shop = entity.shop.id;
            } else {
              preprocess(entity, "shop", root.shopStore.processShopList);
            }
          }

          if (
            Array.isArray(entity.categories) &&
            typeof entity.categories?.[0] === "object"
          ) {
            preprocess(
              entity,
              "categories",
              root.categoryStore.processCategoryList
            );
          }

          self.map.put(entity);
        }
      },
    };
  })
  .actions((self) => {
    return {
      readProductList: flow(function* (params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/items/product`, {
          params: {
            ...params,
            fields:
              "*,image_list.image_id.filename_disk,category_list.category_id",
          },
        });
        self.processProductList(response.data.data);
        return response;
      }),

      readProduct: flow(function* (id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(
          `/items/product/${id}`,
          {
            params: {
              ...params,
              fields:
                "*,image_list.image_id.filename_disk,category_list.category_id",
            },
          }
        );
        self.processProductList(response.data.data);
        return response;
      }),
    };
  });
