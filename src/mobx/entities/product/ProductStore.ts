import {
  types,
  flow,
  getEnv,
  Instance,
  SnapshotIn,
  SnapshotOut
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
    map: types.map(Product)
  })
  .actions(self => {
    return {
      processProductList(data) {
        const root = getRoot(self);
        const { processShopList } = root.shopStore;
        const { processCategoryList } = root.categoryStore;

        for (const entity of _.castArray(data)) {
          entity.images = entity.images.map(data => {
            return {
              url: data.image.data.full_url
            };
          });

          entity.categories = entity.categories.map(data => {
            return data.category_id;
          });
          preprocess(entity, "categories", processCategoryList);
          preprocess(entity, "shop", processShopList);

          self.map.put(entity);
        }
      }
    };
  })
  .actions(self => {
    return {
      createProduct: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/items/product`,
          params
        );
        self.processProductList(response.data);
        return response;
      }),

      readProductList: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/items/product`, {
          params: {
            ...params,
            fields:
              "id,name,shop.*,images.image.data,categories.category_id.image.data"
          }
        });
        self.processProductList(response.data);
        return response;
      }),

      readProduct: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(
          `/items/product/${id}`,
          {
            params
          }
        );
        self.processProductList(response.data);
        return response;
      }),

      updateProduct: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/items/product/${id}`,
          params
        );
        self.processProductList(response.data);
        return response;
      }),

      deleteProduct: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/items/product/${id}`,
          params
        );
        self.processProductList(response.data);
        return response;
      })
    };
  });
