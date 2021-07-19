import { call, put, takeLatest } from "redux-saga/effects";
import { post } from "../../api/productApi/productApi";
import { ADD_ORDER } from "../../constants/actionConst";
import { URL_ORDER } from "../../constants/urlConst";
import { addOrderEr } from "../action";

export default function* order() {
  yield takeLatest(ADD_ORDER, addOrder);
}

function* addOrder(action) {
  try {
    yield call(post, URL_ORDER, action.payload);
  } catch (error) {
    yield put(addOrderEr(error));
  }
}
