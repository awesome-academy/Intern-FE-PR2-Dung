import { fork } from "redux-saga/effects";
import filterSaga from "./filterSaga";
import productSaga from "./productSaga";
import userSaga from "./userSaga";

export default function* Saga() {
  yield fork(productSaga);
  yield fork(userSaga);
  yield fork(filterSaga);
}
