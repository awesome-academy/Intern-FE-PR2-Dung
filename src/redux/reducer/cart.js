import { KEY_CART } from "../../constants/urlConst";
import * as types from "../../constants/actionConst";

const cart = JSON.parse(localStorage.getItem(KEY_CART));

const initState = {
  addSc: null,
  cart: cart || [],
};
export default function cartReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case types.ADD_TO_CART: {
      let { product, number } = action.payload;
      let { cart } = newState;
      const index = cart.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );
      if (index !== -1) {
        cart[index] = {
          ...cart[index],
          count: cart[index].count + number,
        };
      } else {
        cart.push({ ...product, count: number });
      }
      newState = { ...newState, cart: [...cart] };
      localStorage.setItem(KEY_CART, JSON.stringify(cart));
      return { ...newState };
    }
    case types.CHANGE_CART: {
      const { index, quantity } = action.payload;
      newState.cart[index] = { ...newState.cart[index], count: quantity };
      newState = { ...newState, cart: [...newState.cart] };
      localStorage.setItem(KEY_CART, JSON.stringify(newState.cart));

      return { ...newState };
    }
    case types.DELETE_CART: {
      newState.cart.splice(action.payload, 1);
      newState = { ...newState, cart: [...newState.cart] };
      localStorage.setItem(KEY_CART, JSON.stringify(newState.cart));
      return { ...newState };
    }
    default:
      return state;
  }
}

