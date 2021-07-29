import { call, delay, put, takeLatest } from "redux-saga/effects";
import { getData, patch, post } from "../../api/productApi/productApi";
import {
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  GET_ORDER,
  GET_ORDER_ALL,
} from "../../constants/actionConst";
import { URL_ORDER } from "../../constants/urlConst";

import * as action_func from "../action";
import queryString from "query-string";
import { deleteData } from "../../api/usersApi";

export default function* order() {
  yield takeLatest(ADD_ORDER, addOrder);
  yield takeLatest(GET_ORDER, getOrder);
  yield takeLatest(GET_ORDER_ALL, getOrderAll);
  yield takeLatest(EDIT_ORDER, editOrder);
  yield takeLatest(DELETE_ORDER, deleteOrder);
}

function* addOrder(action) {
  try {
    yield call(post, URL_ORDER, action.payload);
  } catch (error) {
    yield put(action_func.addOrderEr(error));
  }
}

function* getOrder(action) {
  try {
    yield put(action_func.addLoading());
    const param = queryString.stringify(action.payload);
    const res = yield call(getData, `${URL_ORDER}?${param}`);
    delay(200);
    yield put(action_func.getOrderSc(res.data));
    yield put(action_func.cancelLoading());
  } catch (error) {
    yield put(action_func.getOrderEr(error));
  }
}

function* getOrderAll() {
  try {
    yield put(action_func.addLoading());

    const res = yield call(getData, URL_ORDER);
    delay(500);
    yield put(action_func.cancelLoading());
    yield put(action_func.getOrderAllSc(res.data));
  } catch (error) {
    yield put(action_func.getOrderAllEr(error));
  }
}

function* editOrder(action) {
  try {
    yield call(patch, `${URL_ORDER}/${action.payload.id}`, action.payload.data);
    yield getOrder({
      payload: {
        _page: 1,
      },
    });
  } catch (error) {
    yield put(action_func.editOrderEr(error));
  }
}

function* deleteOrder(action) {
  try {
    yield call(deleteData, `${URL_ORDER}/${action.payload}`);
    yield getOrder({
      payload: {
        _page: 1,
      },
    });
  } catch (error) {
    yield put(action_func.deleteOrderEr(error));
  }
}
