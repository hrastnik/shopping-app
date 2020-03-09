import { types } from "mobx-state-tree";

import { HttpStatic } from "~/services/http/createHttp";
import { PersistenceStatic } from "~/services/persistence/createPersistence";
import { RegionStore } from "./entities/region/RegionStore";
import { ShopStore } from "./entities/shop/ShopStore";
import { ProductStore } from "./entities/product/ProductStore";
import { UserStore } from "./entities/user/UserStore";
import { AuthStore } from "./AuthStore";
import { UIStore } from "./UIStore";
import { when } from "mobx";
import { Await } from "./utils/Await";
import { CategoryStore } from "./entities/category/CategoryStore";

export interface Environment {
  http: HttpStatic;
  persistence: PersistenceStatic;
}

export async function createStore(env: Environment) {
  const Store = types.optional(
    types.model("Store", {
      regionStore: types.optional(RegionStore, {}),
      shopStore: types.optional(ShopStore, {}),
      categoryStore: types.optional(CategoryStore, {}),
      productStore: types.optional(ProductStore, {}),
      userStore: types.optional(UserStore, {}),
      authStore: types.optional(AuthStore, {}),
      uiStore: types.optional(UIStore, {})
    }),
    {}
  );

  const store = Store.create(undefined, env);

  await when(() => {
    return (
      typeof store.authStore.isLoggedIn === "boolean" &&
      store.uiStore.initialScreen !== undefined
    );
  });

  return store;
}

export interface StoreInstance extends Await<typeof createStore> {}
