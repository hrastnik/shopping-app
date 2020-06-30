import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { DateTime } from "~/mobx/util-models/DateTime";

export interface OrderInstance extends Instance<typeof Order> {}
export interface OrderSnapshotIn extends SnapshotIn<typeof Order> {}
export interface OrderSnapshotOut extends SnapshotOut<typeof Order> {}

export const Order = types.model("Order", {
  id: types.identifierNumber,
  created_at: DateTime,
  data: types.frozen({
    delivery_data: {
      city: types.string,
      address: types.string,
      phone_number: types.string,
    },
    cart_items: [
      {
        product: {
          name: types.string,
          shop: types.string,
          price: types.number,
          categories: [types.string],
        },
        quantity: types.string,
      },
    ],
  }),
});
