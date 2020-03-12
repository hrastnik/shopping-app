import {
  types,
  IMSTMap,
  getParentOfType,
  Instance,
  SnapshotIn,
  SnapshotOut
} from "mobx-state-tree";

import { Product, ProductInstance } from "./entities/product/Product";
import { getRoot } from "./utils/getRoot";

export interface CartItemInstance extends Instance<typeof CartItem> {}
export interface CartItemSnapshotIn extends SnapshotIn<typeof CartItem> {}
export interface CartItemSnapshotOut extends SnapshotOut<typeof CartItem> {}

export const CartItem = types
  .model("CartItem", {
    productId: types.number,
    quantity: types.number
  })
  .views(self => {
    return {
      get productMap(): IMSTMap<typeof Product> {
        return getRoot(self).productStore.map;
      }
    };
  })
  .views(self => {
    return {
      get product() {
        return self.productMap.get(self.productId.toString());
      }
    };
  })
  .actions(self => {
    return {
      removeFromCart(): any {
        const parent = getParentOfType(self, CartStore);
        parent.removeFromCart(self.product.id.toString());
      }
    };
  })
  .actions(self => {
    return {
      setQuantity(quantity) {
        if (quantity <= 0) {
          self.removeFromCart();
        } else {
          self.quantity = quantity;
        }
      }
    };
  });

export interface CartStoreInstance extends Instance<typeof CartStore> {}
export interface CartStoreSnapshotIn extends SnapshotIn<typeof CartStore> {}
export interface CartStoreSnapshotOut extends SnapshotOut<typeof CartStore> {}

export const CartStore = types
  .model("CartStore", {
    cart: types.map(CartItem)
  })
  .actions(self => {
    return {
      setCart(snapshot) {
        self.cart = snapshot;
      },
      addToCart(product: ProductInstance) {
        self.cart.set(product.id.toString(), {
          productId: product.id,
          quantity: 1
        });
      },
      removeFromCart(productId: string) {
        self.cart.delete(productId);
      }
    };
  })
  .views(self => {
    return {
      get cartProducts() {
        return Array.from(self.cart.values())
          .map(item => item.product)
          .filter(product => product != null);
      },
      get numCartItems() {
        let numItems = 0;
        for (const item of self.cart.values()) {
          numItems += item.quantity;
        }
        return numItems;
      }
    };
  });
