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

import { Order } from "~/mobx/entities/order/Order";
import { Environment } from "~/mobx/createStore";

export interface OrderStoreInstance extends Instance<typeof OrderStore> {}
export interface OrderStoreSnapshotIn extends SnapshotIn<typeof OrderStore> {}
export interface OrderStoreSnapshotOut extends SnapshotOut<typeof OrderStore> {}

export const OrderStore = types
  .model("OrderStore", {
    map: types.map(Order),
  })
  .actions((self) => {
    return {
      processOrderList(data) {
        for (const entity of _.castArray(data)) {
          self.map.put(entity);
        }
      },
    };
  })
  .actions((self) => {
    return {
      createOrder: flow(function* (params: {
        data: {
          delivery_data: {
            city: string;
            address: string;
            phone_number: string;
          };
          cart_items: {
            quantity: number;
            product: {
              name: string;
              price: number;
              shop: string;
              categories: string[];
            };
          }[];
        };
      }): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(`/orders`, params);
        self.processOrderList(response.data);
        return response;
      }),

      // readOrderList: flow(function* (params): any {
      //   const env: Environment = getEnv(self);
      //   const response: AxiosResponse = yield env.http.get(`/orders`, {
      //     params,
      //   });
      //   self.processOrderList(response.data);
      //   return response;
      // }),

      // readOrder: flow(function* (id, params): any {
      //   const env: Environment = getEnv(self);
      //   const response: AxiosResponse = yield env.http.get(`/orders/${id}`, {
      //     params,
      //   });
      //   self.processOrderList(response.data);
      //   return response;
      // }),

      // updateOrder: flow(function* (id, params): any {
      //   const env: Environment = getEnv(self);
      //   const response: AxiosResponse = yield env.http.post(
      //     `/orders/${id}`,
      //     params
      //   );
      //   self.processOrderList(response.data);
      //   return response;
      // }),

      // deleteOrder: flow(function* (id, params): any {
      //   const env: Environment = getEnv(self);
      //   const response: AxiosResponse = yield env.http.post(
      //     `/orders/${id}`,
      //     params
      //   );
      //   self.processOrderList(response.data);
      //   return response;
      // }),
    };
  });
