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
import { preprocess } from "~/mobx/utils/preprocess";
import { getRoot } from "~/mobx/utils/getRoot";

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
        const { processCategoryList } = getRoot(self).categoryStore;
        for (const entity of _.castArray(data)) {
          preprocess(entity, "categories", processCategoryList);
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
          `/products`,
          params
        );
        self.processProductList(response.data);
        return response;
      }),

      readProductList: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/products`, {
          params
        });
        self.processProductList(response.data);
        return response;
      }),

      readProduct: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/products/${id}`, {
          params
        });
        self.processProductList(response.data);
        return response;
      }),

      updateProduct: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/products/${id}`,
          params
        );
        self.processProductList(response.data);
        return response;
      }),

      deleteProduct: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/products/${id}`,
          params
        );
        self.processProductList(response.data);
        return response;
      })
    };
  });