import { call, delay, put, takeLatest } from "redux-saga/effects";
import { getData, post } from "../../api/productApi/productApi";
import { ADD_ORDER, GET_ORDER } from "../../constants/actionConst";
import { URL_ORDER } from "../../constants/urlConst";
import {
  addLoading,
  addOrderEr,
  cancelLoading,
  getOrderEr,
  getOrderSc,
} from "../action";
import queryString from "query-string";

export default function* order() {
  yield takeLatest(ADD_ORDER, addOrder);
  yield takeLatest(GET_ORDER, getOrder);
}

function* addOrder(action) {
  try {
    yield call(post, URL_ORDER, action.payload);
  } catch (error) {
    yield put(addOrderEr(error));
  }
}

function* getOrder(action) {
  try {
    yield put(addLoading());
    const param = queryString.stringify(action.payload);
    const res = yield call(getData, `${URL_ORDER}?${param}`);
    delay(200);
    yield put(getOrderSc(res.data));
    yield put(cancelLoading());
  } catch (error) {
    yield put(getOrderEr(error));
  }
}
