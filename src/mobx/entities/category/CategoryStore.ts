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

import { Category } from "~/mobx/entities/category/Category";
import { Environment } from "~/mobx/createStore";

export interface CategoryStoreInstance extends Instance<typeof CategoryStore> {}
export interface CategoryStoreSnapshotIn
  extends SnapshotIn<typeof CategoryStore> {}
export interface CategoryStoreSnapshotOut
  extends SnapshotOut<typeof CategoryStore> {}

export const CategoryStore = types
  .model("CategoryStore", {
    map: types.map(Category)
  })
  .actions(self => {
    return {
      processCategoryList(data) {
        for (const entity of _.castArray(data)) {
          self.map.put(entity);
        }
      }
    };
  })
  .actions(self => {
    return {
      createCategory: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/categories`,
          params
        );
        self.processCategoryList(response.data);
        return response;
      }),

      readCategoryList: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/categories`, {
          params
        });
        self.processCategoryList(response.data);
        return response;
      }),

      readCategory: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(
          `/categories/${id}`,
          {
            params
          }
        );
        self.processCategoryList(response.data);
        return response;
      }),

      updateCategory: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/categories/${id}`,
          params
        );
        self.processCategoryList(response.data);
        return response;
      }),

      deleteCategory: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/categories/${id}`,
          params
        );
        self.processCategoryList(response.data);
        return response;
      })
    };
  });
