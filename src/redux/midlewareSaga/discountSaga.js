import { call, put, takeLatest } from "redux-saga/effects";
import { getData, patch } from "../../api/productApi/productApi";
import { EDIT_DISCOUNT, GET_DISCOUNT } from "../../constants/actionConst";
import { URL_DISCOUNT } from "../../constants/urlConst";
import { editDiscountEr, getDiscountEr, getDiscountSc } from "../action";

export default function* discountSaga() {
  yield takeLatest(GET_DISCOUNT, getDiscount);
  yield takeLatest(EDIT_DISCOUNT, editDiscount);
}

function* getDiscount(action) {
  try {
    const res = yield call(getData, `${URL_DISCOUNT}?code=${action.payload}`);
    yield put(getDiscountSc(res.data));
  } catch (error) {
    yield put(getDiscountEr(error));
  }
}

function* editDiscount(action) {
  try {
    yield call(
      patch,
      `${URL_DISCOUNT}/${action.payload.id}`,
      action.payload.data
    );
  } catch (error) {
    yield put(editDiscountEr(error));
  }
}
