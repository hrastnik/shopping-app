import React from "react";
import { MobXProviderContext } from "mobx-react";

import { StoreInstance } from "./createStore";

export function useStore(): StoreInstance {
  return React.useContext(MobXProviderContext).store;
}
