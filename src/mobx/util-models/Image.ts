import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { constants } from "~/constants";

export interface ImageInstance extends Instance<typeof Image> {}
export interface ImageSnapshotIn extends SnapshotIn<typeof Image> {}
export interface ImageSnapshotOut extends SnapshotOut<typeof Image> {}

export const Image = types
  .model("Image", {
    id: types.identifierNumber,
    name: types.string,
    url: types.string
  })
  .views(self => {
    return {
      get source() {
        return { uri: constants.BASE_URL + self.url };
      }
    };
  });
