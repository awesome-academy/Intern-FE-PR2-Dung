import { combineReducers } from "redux";
import ProductReducer from "./productReducer";
import UserReducer from "./usersReducer";

export const Reducer = combineReducers({
  productsReducer: ProductReducer,
  usersReducer: UserReducer,
});
