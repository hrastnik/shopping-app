import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { environment } from "~/environment";

export interface ImageInstance extends Instance<typeof Image> {}
export interface ImageSnapshotIn extends SnapshotIn<typeof Image> {}
export interface ImageSnapshotOut extends SnapshotOut<typeof Image> {}

export const Image = types
  .model("Image", { filename_disk: types.string })
  .views((self) => {
    return {
      get url() {
        return `${environment.API_BASE}uploads/_/originals/${self.filename_disk}`;
      },
    };
  })
  .views((self) => {
    return {
      get source() {
        return { uri: self.url };
      },
    };
  });
