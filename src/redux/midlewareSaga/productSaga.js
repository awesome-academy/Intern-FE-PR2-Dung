import { getData } from "../../api/productApi/productApi";
// import { getProductSc } from "../action";
import queryString from "query-string";
import { URL_PRODUCT } from "../../constants/urlConst";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as actionFunc from "../action/index";
import * as actionType from "../../constants/actionConst";
import { delay } from "redux-saga/effects";

export default function* productSaga() {
  yield takeLatest(actionType.GET_PRODUCT, getProducts);
}

function* getProducts(action) {
  try {
    const param = queryString.stringify(action.payload);
    yield put(actionFunc.addLoading());
    const res = yield call(getData, `${URL_PRODUCT}?${param}`);
    yield delay(200);
    yield put(actionFunc.cancelLoading());
    yield put(actionFunc.getProductSc(res.data));
  } catch (error) {
    yield put(actionFunc.getProductEr(error));
  }
}
