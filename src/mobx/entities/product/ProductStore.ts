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
        for (const entity of _.castArray(data)) {
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
      }),

      readProductList: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/products`, {
          params
        });
        self.processProductList(response.data);
      }),

      readProduct: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/products/${id}`, {
          params
        });
        self.processProductList(response.data);
      }),

      updateProduct: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/products/${id}`,
          params
        );
        self.processProductList(response.data);
      }),

      deleteProduct: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/products/${id}`,
          params
        );
        self.processProductList(response.data);
      })
    };
  });
