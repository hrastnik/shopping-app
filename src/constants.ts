import { environment } from "./environment";

const BASE_URL = environment.API_URL;

const STORAGE_KEYS = {
  FAVORITES: "favorite products",
  CART: "cart",
  ADDRESS: "address",
};

export const constants = {
  BASE_URL,
  STORAGE_KEYS,
};
