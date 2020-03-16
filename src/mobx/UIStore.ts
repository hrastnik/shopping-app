import {
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  getEnv,
  getSnapshot,
  tryReference
} from "mobx-state-tree";

import { Region } from "./entities/region/Region";
import { Shop } from "./entities/shop/Shop";
import { Category } from "./entities/category/Category";
import { Product, ProductInstance } from "./entities/product/Product";
import { Environment } from "./createStore";
import { Await } from "./utils/Await";
import { PersistenceStatic } from "~/services/persistence/createPersistence";
import { autorun } from "mobx";
import { constants } from "~/constants";
import { getRoot } from "./utils/getRoot";

export interface UIStoreInstance extends Instance<typeof UIStore> {}
export interface UIStoreSnapshotIn extends SnapshotIn<typeof UIStore> {}
export interface UIStoreSnapshotOut extends SnapshotOut<typeof UIStore> {}

export const UIStore = types
  .model("UIStore", {
    initialScreen: types.maybe(types.string),
    activeRegion: types.safeReference(Region),
    activeShop: types.safeReference(Shop),
    activeProduct: types.safeReference(Product),
    activeCategory: types.safeReference(Category),

    favoriteProductMap: types.map(
      types.safeReference(Product, { acceptsUndefined: false })
    )
  })
  .views(self => {
    return {
      get favoriteProductList(): ProductInstance[] {
        const favorites = Array.from(self.favoriteProductMap.values());
        const resolved = [];
        for (let index = 0; index < favorites.length; index++) {
          const product = tryReference(() => favorites[index]);
          if (favorites) resolved.push(product);
        }
        return resolved;
      }
    };
  })
  .views(self => {
    return {
      get activeRegionId() {
        return getSnapshot(self).activeRegion as string;
      },
      get activeShopId() {
        return getSnapshot(self).activeShop as string;
      },
      get activeProductId() {
        return getSnapshot(self).activeProduct as string;
      },
      get activeCategoryId() {
        return getSnapshot(self).activeCategory as string;
      }
    };
  })
  .actions(self => {
    return {
      toggleFavorite(id: number) {
        const isAlreadyFavorited = self.favoriteProductMap.has(id.toString());

        if (isAlreadyFavorited) {
          self.favoriteProductMap.delete(id.toString());
        } else {
          self.favoriteProductMap.set(id.toString(), id);
        }
      },
      clearFavoriteMap() {
        self.favoriteProductMap.clear();
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
          // yield env.persistence.set(
          //   constants.STORAGE_KEYS.FAVORITES,
          //   undefined
          // );

          const favoriteList =
            (yield env.persistence.get(
              constants.STORAGE_KEYS.FAVORITES
            ) as Await<PersistenceStatic["get"]>) ?? [];

          getRoot(self).productStore.processProductList(favoriteList);

          for (const product of favoriteList) {
            self.favoriteProductMap.set(product.id.toString(), product.id);
          }
        } catch (error) {
          console.warn(
            "error setting favorite products from persistence",
            error
          );
        }

        autorun(() => {
          const favorites = self.favoriteProductList.map(product => ({
            ...product
          }));
          env.persistence.set(constants.STORAGE_KEYS.FAVORITES, favorites);
        });
      })
    };
  });
