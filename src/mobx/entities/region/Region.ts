import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";

// import { DateTime } from "~/mobx/util-models/DateTime";
import { getRoot } from "~/mobx/utils/getRoot";
import { Image } from "~/mobx/util-models/Image";

export interface RegionInstance extends Instance<typeof Region> {}
export interface RegionSnapshotIn extends SnapshotIn<typeof Region> {}
export interface RegionSnapshotOut extends SnapshotOut<typeof Region> {}

export const Region = types
  .model("Region", {
    id: types.identifierNumber,
    name: types.string,
    description: types.string,
    image: Image,
  })
  .actions((self) => {
    return {
      refresh: flow(function* (params): any {
        const root = getRoot(self);
        yield root.regionStore.readRegion(self.id, params);
      }),
    };
  })
  .actions((self) => {
    return {
      readShopList: flow(function* (params): any {
        const root = getRoot(self);
        return yield root.shopStore.readShopList({
          "filter[region][eq]": self.id,
          ...params,
        });
      }),
    };
  });
