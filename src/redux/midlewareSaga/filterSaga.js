import { getData } from "../../api/productApi/productApi";
import {
  URL_TAG,
  URL_BRAND,
  URL_CATEGORIES,
  URL_SIZE,
} from "../../constants/urlConst";
import { call, takeLatest } from "@redux-saga/core/effects";
import * as actionFunc from "../action/index";
import * as actionType from "../../constants/actionConst";
import { put } from "redux-saga/effects";

export default function* filterSaga() {
  yield takeLatest(actionType.GET_TAG, getTag);
  yield takeLatest(actionType.GET_CATEGORIES, getCategories);
  yield takeLatest(actionType.GET_BRAND, getBrand);
  yield takeLatest(actionType.GET_SIZE, getSize);
}

function* getTag() {
  try {
    const res = yield call(getData, URL_TAG);
    yield put(actionFunc.getTagSc(res.data));
  } catch (error) {
    yield put(actionFunc.getTagEr(error));
  }
}

function* getCategories() {
  try {
    const res = yield call(getData, URL_CATEGORIES);
    yield put(actionFunc.getCategoriesSc(res.data));
  } catch (error) {
    yield put(actionFunc.getCategoriesEr(error));
  }
}

function* getBrand() {
  try {
    const res = yield call(getData, URL_BRAND);
    yield put(actionFunc.getBrandSc(res.data));
  } catch (error) {
    yield put(actionFunc.getBrandEr(error));
  }
}

function* getSize() {
  try {
    const res = yield call(getData, URL_SIZE);
    yield put(actionFunc.getSizeSc(res.data));
  } catch (error) {
    yield put(actionFunc.getSizeEr(error));
  }
}
