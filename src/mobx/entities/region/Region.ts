import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut
} from "mobx-state-tree";

import { DateTime } from "~/mobx/util-models/DateTime";
import { getRoot } from "~/mobx/utils/getRoot";

export interface RegionInstance extends Instance<typeof Region> {}
export interface RegionSnapshotIn extends SnapshotIn<typeof Region> {}
export interface RegionSnapshotOut extends SnapshotOut<typeof Region> {}

export const Region = types
  .model("Region", {
    id: types.identifierNumber,
    created_at: DateTime,
    updated_at: DateTime,
    name: types.string,
    lat: types.number,
    lng: types.number
  })
  .actions(self => {
    return {
      refresh: flow(function*(params): any {
        const root = getRoot(self);
        yield root.regionStore.readRegion(self.id, params);
      }),

      update: flow(function*(params): any {
        const root = getRoot(self);
        yield root.regionStore.updateRegion(self.id, params);
      }),

      delete: flow(function*(params): any {
        const root = getRoot(self);
        yield root.regionStore.deleteRegion(self.id, params);
      })
    };
  })
  .actions(self => {
    return {
      readShopList: flow(function*(params): any {
        const root = getRoot(self);
        return yield root.shopStore.readShopList({
          region: self.id,
          ...params
        });
      })
    };
  });
