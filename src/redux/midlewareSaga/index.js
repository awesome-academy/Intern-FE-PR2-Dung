import { fork } from "redux-saga/effects";
import productSaga from "./productSaga";
import userSaga from "./userSaga";

export default function* Saga() {
  yield fork(productSaga);
  yield fork(userSaga);
}
