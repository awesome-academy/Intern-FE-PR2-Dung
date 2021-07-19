import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import loadingReducer from "./loading";
import productReducer from "./productReducer";
import userReducer from "./usersReducer";

export const Reducer = combineReducers({
  productsReducer: productReducer,
  usersReducer: userReducer,
  loading: loadingReducer,
  filter: filterReducer,
});
