import cart, {
  types as cartTypes,
  actions as cartActions,
  selectors as cartSelectors,
  sagas as cartSagas,
} from "./cart";

export const types = {
  cart: cartTypes
};

export const actions = {
  cart: cartActions,
};

export const selectors = {
  cart: cartSelectors
};

export const reducers = {
  cart
};

export const sagas = [
  ...cartSagas
];
