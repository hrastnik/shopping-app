import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut
} from "mobx-state-tree";
import { DateTime } from "~/mobx/util-models/DateTime";
import { getRoot } from "~/mobx/utils/getRoot";

export interface CategoryInstance extends Instance<typeof Category> {}
export interface CategorySnapshotIn extends SnapshotIn<typeof Category> {}
export interface CategorySnapshotOut extends SnapshotOut<typeof Category> {}

export const Category = types
  .model("Category", {
    id: types.identifierNumber,
    created_at: DateTime,
    updated_at: DateTime,
    name: types.string,
    uid: types.string
  })
  .actions(self => {
    return {
      refresh: flow(function*(params): any {
        const root = getRoot(self);
        return yield root.categoryStore.readCategory(self.id, params);
      }),

      update: flow(function*(params): any {
        const root = getRoot(self);
        return yield root.categoryStore.updateCategory(self.id, params);
      }),

      delete: flow(function*(params): any {
        const root = getRoot(self);
        return yield root.categoryStore.deleteCategory(self.id, params);
      })
    };
  });