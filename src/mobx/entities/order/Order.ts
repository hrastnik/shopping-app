import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut
} from "mobx-state-tree";
import { DateTime } from "~/mobx/util-models/DateTime";
import { getRoot } from "~/mobx/utils/getRoot";

export interface OrderInstance extends Instance<typeof Order> {}
export interface OrderSnapshotIn extends SnapshotIn<typeof Order> {}
export interface OrderSnapshotOut extends SnapshotOut<typeof Order> {}

export const Order = types
  .model("Order", {
    id: types.identifierNumber,
    created_at: DateTime,
    updated_at: DateTime
  })
  .volatile(() => {
    return {
      cart: undefined
    };
  })
  .actions(self => {
    return {
      refresh: flow(function*(params): any {
        const root = getRoot(self);
        return yield root.orderStore.readOrder(self.id, params);
      }),

      update: flow(function*(params): any {
        const root = getRoot(self);
        return yield root.orderStore.updateOrder(self.id, params);
      }),

      delete: flow(function*(params): any {
        const root = getRoot(self);
        return yield root.orderStore.deleteOrder(self.id, params);
      })
    };
  });
