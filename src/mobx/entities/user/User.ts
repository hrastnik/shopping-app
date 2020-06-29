import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import { getRoot } from "~/mobx/utils/getRoot";

export interface UserInstance extends Instance<typeof User> {}
export interface UserSnapshotIn extends SnapshotIn<typeof User> {}
export interface UserSnapshotOut extends SnapshotOut<typeof User> {}

export const User = types
  .model("User", {
    id: types.identifierNumber,
    firstName: types.string,
    lastName: types.string,
    email: types.string,
    phone: types.string,
    city: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
  })
  .actions((self) => {
    return {
      refresh: flow(function* (params): any {
        const root = getRoot(self);
        yield root.userStore.readUser(self.id, params);
      }),

      update: flow(function* (params): any {
        const root = getRoot(self);
        yield root.userStore.updateUser(self.id, params);
      }),

      delete: flow(function* (params): any {
        const root = getRoot(self);
        yield root.userStore.deleteUser(self.id, params);
      }),
    };
  });
