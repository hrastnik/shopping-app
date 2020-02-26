import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut
} from "mobx-state-tree";

import { DateTime } from "~/mobx/util-models/DateTime";
import { getRoot } from "~/mobx/utils/getRoot";
import { Image } from "~/mobx/util-models/Image";

export interface ProductInstance extends Instance<typeof Product> {}
export interface ProductSnapshotIn extends SnapshotIn<typeof Product> {}
export interface ProductSnapshotOut extends SnapshotOut<typeof Product> {}

export const Product = types
  .model("Product", {
    id: types.identifierNumber,
    created_at: DateTime,
    updated_at: DateTime,
    name: types.string,
    description: types.string,
    price: types.number,
    images: types.array(Image)
  })
  .views(self => {
    return {
      get priceText() {
        return self.price.toFixed(2) + "$";
      },

      get image() {
        return self.images?.[0];
      },

      get isFavorited(): boolean {
        const root = getRoot(self);
        const isFave = root.uiStore.favoriteProducts.has(self.id.toString());
        return isFave;
      }
    };
  })
  .actions(self => {
    return {
      toggleFavorite() {
        const root = getRoot(self);
        root.uiStore.toggleFavorite(self.id);
      },

      refresh: flow(function*(params = undefined): any {
        const root = getRoot(self);
        yield root.productStore.readProduct(self.id, params);
      }),

      update: flow(function*(params): any {
        const root = getRoot(self);
        yield root.productStore.updateProduct(self.id, params);
      }),

      delete: flow(function*(params): any {
        const root = getRoot(self);
        yield root.productStore.deleteProduct(self.id, params);
      })
    };
  });
