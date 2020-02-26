import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut
} from "mobx-state-tree";
import { DateTime } from "~/mobx/util-models/DateTime";
import { getRoot } from "~/mobx/utils/getRoot";

export interface ShopInstance extends Instance<typeof Shop> {}
export interface ShopSnapshotIn extends SnapshotIn<typeof Shop> {}
export interface ShopSnapshotOut extends SnapshotOut<typeof Shop> {}

export const Shop = types
  .model("Shop", {
    id: types.identifierNumber,
    created_at: DateTime,
    updated_at: DateTime,
    name: types.string
  })
  .actions(self => {
    return {
      refresh: flow(function*(params): any {
        const root = getRoot(self);
        yield root.shopStore.readShop(self.id, params);
      }),

      update: flow(function*(params): any {
        const root = getRoot(self);
        yield root.shopStore.updateShop(self.id, params);
      }),

      delete: flow(function*(params): any {
        const root = getRoot(self);
        yield root.shopStore.deleteShop(self.id, params);
      })
    };
  })
  .actions(self => {
    return {
      readProductList: flow(function*(params): any {
        const root = getRoot(self);
        return yield root.productStore.readProductList({
          shop: self.id,
          ...params
        });
      })
    };
  });
