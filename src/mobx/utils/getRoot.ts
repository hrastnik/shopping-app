import { getRoot as MSTgetRoot } from "mobx-state-tree";
import { StoreInstance } from "../createStore";

export function getRoot(
  target: Parameters<typeof MSTgetRoot>["0"]
): StoreInstance {
  return MSTgetRoot(target);
}
