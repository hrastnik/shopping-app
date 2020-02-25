import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

import { Region } from "./entities/region/Region";
import { Shop } from "./entities/shop/Shop";

export interface UIStoreInstance extends Instance<typeof UIStore> {}
export interface UIStoreSnapshotIn extends SnapshotIn<typeof UIStore> {}
export interface UIStoreSnapshotOut extends SnapshotOut<typeof UIStore> {}

export const UIStore = types
  .model("UIStore", {
    activeRegion: types.safeReference(Region),
    activeShop: types.safeReference(Shop)
  })
  .actions(self => {
    return {
      set(key: keyof typeof self, value: string) {
        self[key as string] = value;
      }
    };
  });
