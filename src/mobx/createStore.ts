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
import { OrderStore } from "./entities/order/OrderStore";

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
        orderStore: types.optional(OrderStore, {}),
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

  // Access cartStore to run CartStore.afterAttach
  store.cartStore;

  await when(() => {
    return store.authStore && store.uiStore.initialScreen !== undefined;
  });

  return store;
}

export interface StoreInstance extends Await<typeof createStore> {}
