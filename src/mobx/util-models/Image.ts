import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface ImageInstance extends Instance<typeof Image> {}
export interface ImageSnapshotIn extends SnapshotIn<typeof Image> {}
export interface ImageSnapshotOut extends SnapshotOut<typeof Image> {}

export const Image = types.model("Image", { url: types.string }).views(self => {
  return {
    get source() {
      return { uri: self.url };
    }
  };
});
