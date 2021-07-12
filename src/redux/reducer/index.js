import { combineReducers } from "redux";
import ProductReducer from "./productReducer";

export const Reducer = combineReducers({
  productsReducer: ProductReducer,
});
