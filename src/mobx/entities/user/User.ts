import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut
} from "mobx-state-tree";
import { DateTime } from "~/mobx/util-models/DateTime";
import { getRoot } from "~/mobx/utils/getRoot";

export interface UserInstance extends Instance<typeof User> {}
export interface UserSnapshotIn extends SnapshotIn<typeof User> {}
export interface UserSnapshotOut extends SnapshotOut<typeof User> {}

export const User = types
  .model("User", {
    id: types.identifierNumber,
    created_at: DateTime,
    updated_at: DateTime,
    username: types.string,
    email: types.string,
    provider: "local" as const,
    confirmed: types.boolean,
    blocked: types.maybeNull(types.boolean),
    role: types.model({
      id: types.number,
      name: types.string,
      description: types.string,
      type: types.string
    })
  })
  .actions(self => {
    return {
      refresh: flow(function*(params): any {
        const root = getRoot(self);
        yield root.userStore.readUser(self.id, params);
      }),

      update: flow(function*(params): any {
        const root = getRoot(self);
        yield root.userStore.updateUser(self.id, params);
      }),

      delete: flow(function*(params): any {
        const root = getRoot(self);
        yield root.userStore.deleteUser(self.id, params);
      })
    };
  });
