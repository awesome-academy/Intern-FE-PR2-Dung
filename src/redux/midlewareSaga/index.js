import { fork } from "redux-saga/effects";
import ProductSaga from "./productSaga";

export default function* Saga() {
  yield fork(ProductSaga);
}
