import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

import { Region } from "./entities/region/Region";
import { Shop } from "./entities/shop/Shop";
import { Product } from "./entities/product/Product";

export interface UIStoreInstance extends Instance<typeof UIStore> {}
export interface UIStoreSnapshotIn extends SnapshotIn<typeof UIStore> {}
export interface UIStoreSnapshotOut extends SnapshotOut<typeof UIStore> {}

export const UIStore = types
  .model("UIStore", {
    initialScreen: types.maybe(types.string),
    activeRegion: types.safeReference(Region),
    activeShop: types.safeReference(Shop),
    activeProduct: types.safeReference(Product)
  })
  .actions(self => {
    return {
      set(key: keyof typeof self, value: any) {
        self[key as string] = value;
      }
    };
  });
