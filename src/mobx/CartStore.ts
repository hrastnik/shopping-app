import {
  types,
  IMSTMap,
  getParentOfType,
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  getEnv,
} from "mobx-state-tree";

import { Product, ProductInstance } from "./entities/product/Product";
import { getRoot } from "./utils/getRoot";
import { ShopInstance } from "./entities/shop/Shop";
import { Environment } from "./createStore";
import { constants } from "~/constants";
import { autorun } from "mobx";

export interface CartItemInstance extends Instance<typeof CartItem> {}
export interface CartItemSnapshotIn extends SnapshotIn<typeof CartItem> {}
export interface CartItemSnapshotOut extends SnapshotOut<typeof CartItem> {}

export const CartItem = types
  .model("CartItem", {
    productId: types.number,
    quantity: types.number,
  })
  .views((self) => {
    return {
      get productMap(): IMSTMap<typeof Product> {
        return getRoot(self).productStore.map;
      },
    };
  })
  .views((self) => {
    return {
      get product() {
        return self.productMap.get(self.productId.toString());
      },
    };
  })
  .views((self) => {
    return {
      get price() {
        return self.quantity * self.product.price;
      },
    };
  })
  .actions((self) => {
    return {
      removeFromCart(): any {
        const parent = getParentOfType(self, CartStore);
        parent.removeFromCart(self.product.id.toString());
      },
    };
  })
  .actions((self) => {
    return {
      setQuantity(quantity) {
        if (quantity <= 0) {
          self.removeFromCart();
        } else {
          self.quantity = quantity;
        }
      },
    };
  });

export interface CartStoreInstance extends Instance<typeof CartStore> {}
export interface CartStoreSnapshotIn extends SnapshotIn<typeof CartStore> {}
export interface CartStoreSnapshotOut extends SnapshotOut<typeof CartStore> {}

export const CartStore = types
  .model("CartStore", {
    cart: types.map(CartItem),
    city: "",
    address: "",
  })
  .actions((self) => {
    return {
      setFullAddress(values: { city: string; address: string }) {
        self.city = values.city;
        self.address = values.address;
      },
      setCart(snapshot) {
        self.cart = snapshot;
      },
      addToCart(product: ProductInstance) {
        self.cart.set(product.id.toString(), {
          productId: product.id,
          quantity: 1,
        });
      },
      removeFromCart(productId: string) {
        self.cart.delete(productId);
      },
      clearCart() {
        self.cart.clear();
      },
    };
  })
  .views((self) => {
    return {
      get cartItemList() {
        return Array.from(self.cart.values());
      },
    };
  })
  .views((self) => {
    return {
      get cartProducts() {
        return self.cartItemList
          .map((item) => item.product)
          .filter((product) => product != null);
      },
      get numCartItems() {
        let numItems = 0;
        for (const item of self.cartItemList) {
          numItems += item.quantity;
        }
        return numItems;
      },
    };
  })
  .views((self) => {
    return {
      get priceByShop(): {
        price: number;
        numItems: number;
        numProducts: number;
        shop: ShopInstance;
        cartItems: CartItemInstance[];
      }[] {
        const shops = {};

        for (const cartItem of self.cart.values()) {
          if (shops[cartItem.product.shop.id] == null) {
            shops[cartItem.product.shop.id] = {
              price: 0,
              numItems: 0,
              numProducts: 0,
              shop: cartItem.product.shop,
              cartItems: [],
            };
          }

          const context = shops[cartItem.product.shop.id];
          context.price += cartItem.product.price * cartItem.quantity;
          context.numItems += cartItem.quantity;
          context.numProducts++;
          context.cartItems.push(cartItem);
        }

        return Object.values(shops);
      },
      get totalPrice() {
        let totalPrice = 0;
        for (const cartItem of self.cart.values()) {
          totalPrice += cartItem.product.price * cartItem.quantity;
        }
        return totalPrice;
      },
    };
  })
  .actions((self) => {
    return {
      afterAttach: flow(function* (): any {
        const env: Environment = getEnv(self);

        const address = yield env.persistence.get(
          constants.STORAGE_KEYS.ADDRESS
        );
        if (address) {
          self.address = address?.address ?? "";
          self.city = address?.city ?? "";
        }

        autorun(() => {
          env.persistence.set(constants.STORAGE_KEYS.ADDRESS, {
            address: self.address,
            city: self.city,
          });
        });

        const cartItems = yield env.persistence.get(
          constants.STORAGE_KEYS.CART
        );

        if (Array.isArray(cartItems)) {
          const products = cartItems.map((cartItem) => cartItem.product);

          getRoot(self).productStore.processProductList(products);
          for (const cartItem of cartItems) {
            self.cart.set(cartItem.product.id, cartItem);
          }
        }

        autorun(() => {
          const cartItems = Array.from(self.cart.values()).map((cartItem) => {
            return {
              ...cartItem,
              product: { ...cartItem.product },
            };
          });

          env.persistence.set(constants.STORAGE_KEYS.CART, cartItems);
        });
      }),
    };
  })
  .actions((self) => {
    return {
      confirmOrder: flow(function* (): any {
        const root = getRoot(self);
        const response = yield root.orderStore.createOrder({
          data: {
            delivery_data: {
              city: self.city,
              address: self.address,
              phone_number: root.authStore.activeUser.phone,
            },
            cart_items: self.cartItemList.map((cartItem) => {
              return {
                product: {
                  name: cartItem.product.name,
                  shop: cartItem.product.shop.name,
                  price: cartItem.product.price,
                  categories: cartItem.product.categories.map(
                    (category) => category.name
                  ),
                },
                quantity: cartItem.quantity,
              };
            }),
          },
        });

        return response;
      }),
    };
  });
