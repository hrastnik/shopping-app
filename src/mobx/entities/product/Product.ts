import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut
} from "mobx-state-tree";

import { DateTime } from "~/mobx/util-models/DateTime";
import { getRoot } from "~/mobx/utils/getRoot";

export interface ProductInstance extends Instance<typeof Product> {}
export interface ProductSnapshotIn extends SnapshotIn<typeof Product> {}
export interface ProductSnapshotOut extends SnapshotOut<typeof Product> {}

export const Product = types
  .model("Product", {
    id: types.identifierNumber,
    created_at: DateTime,
    updated_at: DateTime,
    name: types.string,
    images: types.array(
      types
        .model("Image", {
          id: types.identifierNumber,
          name: types.string,
          url: types.string
        })
        .views(self => {
          return {
            get source() {
              return { uri: "http://192.168.1.102:1337" + self.url };
            }
          };
        })
    )
  })
  .actions(self => {
    return {
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
