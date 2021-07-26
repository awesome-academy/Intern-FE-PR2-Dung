import { fork } from "redux-saga/effects";
import commentSaga from "./commentSaga";
import filterSaga from "./filterSaga";
import order from "./orderSaga";
import productSaga from "./productSaga";
import userSaga from "./userSaga";

export default function* Saga() {
  yield fork(productSaga);
  yield fork(userSaga);
  yield fork(filterSaga);
  yield fork(commentSaga);
  yield fork(order);
}
