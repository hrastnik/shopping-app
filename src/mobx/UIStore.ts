import {
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  getEnv
} from "mobx-state-tree";

import { Region } from "./entities/region/Region";
import { Shop } from "./entities/shop/Shop";
import { Product } from "./entities/product/Product";
import { Environment } from "./createStore";
import { Await } from "./utils/Await";
import { PersistenceStatic } from "~/services/persistence/createPersistence";
import { autorun } from "mobx";
import { constants } from "~/constants";

export interface UIStoreInstance extends Instance<typeof UIStore> {}
export interface UIStoreSnapshotIn extends SnapshotIn<typeof UIStore> {}
export interface UIStoreSnapshotOut extends SnapshotOut<typeof UIStore> {}

export const UIStore = types
  .model("UIStore", {
    initialScreen: types.maybe(types.string),
    activeRegion: types.safeReference(Region),
    activeShop: types.safeReference(Shop),
    activeProduct: types.safeReference(Product),

    favoriteProducts: types.map(
      types.safeReference(Product, { acceptsUndefined: false })
    )
  })
  .actions(self => {
    return {
      toggleFavorite(id: number) {
        const isAlreadyFavorited = self.favoriteProducts.has(id.toString());

        if (isAlreadyFavorited) {
          self.favoriteProducts.delete(id.toString());
        } else {
          self.favoriteProducts.set(id.toString(), id);
        }
      }
    };
  })
  .actions(self => {
    return {
      set(key: keyof typeof self, value: any) {
        self[key as string] = value;
      },

      afterAttach: flow(function*(): any {
        const env: Environment = getEnv(self);
        try {
          const favorites = yield env.persistence.get(
            constants.STORAGE_KEYS.FAVORITES
          ) as Await<PersistenceStatic["get"]>;

          self.favoriteProducts = favorites ?? {};
        } catch (error) {
          console.warn(
            "error setting favorite products from persistence",
            error
          );
        }

        autorun(() => {
          env.persistence.set(
            constants.STORAGE_KEYS.FAVORITES,
            self.favoriteProducts
          );
        });
      })
    };
  });
