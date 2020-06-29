import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import { getRoot } from "~/mobx/utils/getRoot";
import { Image } from "~/mobx/util-models/Image";
import { Region } from "../region/Region";

export interface ShopInstance extends Instance<typeof Shop> {}
export interface ShopSnapshotIn extends SnapshotIn<typeof Shop> {}
export interface ShopSnapshotOut extends SnapshotOut<typeof Shop> {}

export const Shop = types
  .model("Shop", {
    id: types.identifierNumber,
    name: types.string,
    description: types.string,
    image: Image,
    location: types.frozen({
      lat: types.number,
      lng: types.number,
    }),
    region: types.safeReference(Region),
  })
  .actions((self) => {
    return {
      refresh: flow(function* (params): any {
        const root = getRoot(self);
        yield root.shopStore.readShop(self.id, params);
      }),
    };
  })
  .actions((self) => {
    return {
      readProductList: flow(function* (params): any {
        const root = getRoot(self);
        return yield root.productStore.readProductList({
          shop: self.id,
          ...params,
        });
      }),
    };
  });
