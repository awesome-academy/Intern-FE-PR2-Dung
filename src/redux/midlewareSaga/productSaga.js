import { getData, patch, post } from "../../api/productApi/productApi";
import queryString from "query-string";
import { URL_PRODUCT } from "../../constants/urlConst";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as actionFunc from "../action/index";
import * as actionType from "../../constants/actionConst";
import { delay } from "redux-saga/effects";
import { deleteData } from "../../api/usersApi";

export default function* productSaga() {
  yield takeLatest(actionType.GET_PRODUCT, getProducts);
  yield takeLatest(actionType.GET_PRODUCT_SEARCH, getProductSearch);
  yield takeLatest(actionType.DELETE_PRODUCT, deleteProduct);
  yield takeLatest(actionType.ADD_PRODUCT, addProduct);
  yield takeLatest(actionType.EDIT_PRODUCT, editProduct);
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

function* getProductSearch(action) {
  try {
    const param = queryString.stringify(action.payload);
    const res = yield call(getData, `${URL_PRODUCT}?${param}`);
    yield put(actionFunc.getProductSearchSc(res.data));
  } catch (error) {
    yield put(actionFunc.getProductSearchEr(error));
  }
}

function* deleteProduct(action) {
  try {
    yield call(deleteData, `${URL_PRODUCT}/${action.payload}`);
    yield getProducts({
      payload: {
        _page: 1,
        _limit: 9,
      },
    });
  } catch (error) {
    yield put(actionFunc.deleteProductEr(error));
  }
}

function* editProduct(action) {
  try {
    yield call(
      patch,
      `${URL_PRODUCT}/${action.payload.id}`,
      action.payload.data
    );
    yield getProducts({
      payload: {
        _page: 1,
        _limit: 9,
      },
    });
  } catch (error) {
    yield put(actionFunc.editProductEr(error));
  }
}

function* addProduct(action) {
  try {
    yield call(post, `${URL_PRODUCT}`, action.payload);
    yield getProducts({
      payload: {
        _page: 1,
        _limit: 9,
      },
    });
  } catch (error) {
    yield put(actionFunc.editProductEr(error));
  }
}
