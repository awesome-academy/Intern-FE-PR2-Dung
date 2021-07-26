import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import loadingReducer from "./loading";
import productReducer from "./productReducer";
import userReducer from "./usersReducer";
import commentReducer from "./commentReducer";
import cartReducer from "./cart";
import ordersReducer from "./order";

export const Reducer = combineReducers({
  productsReducer: productReducer,
  usersReducer: userReducer,
  loading: loadingReducer,
  filter: filterReducer,
  commentReducer: commentReducer,
  cartReducer: cartReducer,
  orderReducer: ordersReducer,
});
