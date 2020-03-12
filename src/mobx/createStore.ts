import { types } from "mobx-state-tree";
import { when } from "mobx";

import { HttpStatic } from "~/services/http/createHttp";
import { PersistenceStatic } from "~/services/persistence/createPersistence";
import { RegionStore } from "./entities/region/RegionStore";
import { ShopStore } from "./entities/shop/ShopStore";
import { ProductStore } from "./entities/product/ProductStore";
import { UserStore } from "./entities/user/UserStore";
import { CategoryStore } from "./entities/category/CategoryStore";
import { AuthStore } from "./AuthStore";
import { UIStore } from "./UIStore";
import { CartStore } from "./CartStore";
import { Await } from "./utils/Await";
import { useNavigation } from "@react-navigation/native";

export interface Environment {
  http: HttpStatic;
  persistence: PersistenceStatic;
}

export async function createStore(env: Environment) {
  const Store = types.optional(
    types
      .model("Store", {
        regionStore: types.optional(RegionStore, {}),
        shopStore: types.optional(ShopStore, {}),
        categoryStore: types.optional(CategoryStore, {}),
        productStore: types.optional(ProductStore, {}),
        userStore: types.optional(UserStore, {}),
        authStore: types.optional(AuthStore, {}),
        uiStore: types.optional(UIStore, {}),
        cartStore: types.optional(CartStore, {})
      })
      .volatile(() => {
        return {
          navigation: undefined
        } as { navigation: ReturnType<typeof useNavigation> };
      })
      .actions(self => {
        return {
          setNavigation(navigation) {
            self.navigation = navigation;
          }
        };
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

  await when(() => store.categoryStore.map.size > 0);

  return store;
}

export interface StoreInstance extends Await<typeof createStore> {}
