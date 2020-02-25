import { types } from "mobx-state-tree";

import { HttpStatic } from "~/services/http/createHttp";
import { PersistenceStatic } from "~/services/persistence/createPersistence";
import { RegionStore } from "./entities/region/RegionStore";
import { ShopStore } from "./entities/shop/ShopStore";
import { ProductStore } from "./entities/product/ProductStore";
import { UserStore } from "./entities/user/UserStore";
import { AuthStore } from "./AuthStore";
import { UIStore } from "./UIStore";

export interface Environment {
  http: HttpStatic;
  persistence: PersistenceStatic;
}

export function createStore(env: Environment) {
  const Store = types.optional(
    types.model("Store", {
      regionStore: types.optional(RegionStore, {}),
      shopStore: types.optional(ShopStore, {}),
      productStore: types.optional(ProductStore, {}),
      userStore: types.optional(UserStore, {}),
      authStore: types.optional(AuthStore, {}),
      uiStore: types.optional(UIStore, {})
    }),
    {}
  );

  const store = Store.create(undefined, env);

  return store;
}

export interface StoreInstance extends ReturnType<typeof createStore> {}
