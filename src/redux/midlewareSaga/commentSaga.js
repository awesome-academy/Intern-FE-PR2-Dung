import { call, put, takeLatest } from "@redux-saga/core/effects";
import { getData, post } from "../../api/productApi/productApi";
import { URL_COMMENT } from "../../constants/urlConst";
import * as types from "../../constants/actionConst";
import * as func_action from "../action";
import queryString from "query-string";

export default function* commentSaga() {
  yield takeLatest(types.ADD_COMMENT, addComment);
  yield takeLatest(types.GET_COMMENT, getComment);
}

function* addComment(action) {
  try {
    yield call(post, URL_COMMENT, action.payload);
    const data = {
      _page: 1,
      idProduct: action.payload.idProduct,
      _sort: "createdAt",
      _order: "desc",
      _limit: 6,
    };
    yield put(func_action.getComment({ ...data }));
  } catch (error) {
    yield put(func_action.addCommentEr(error));
  }
}

function* getComment(action) {
  try {
    const param = queryString.stringify(action.payload);
    const comment = yield call(getData, `${URL_COMMENT}?${param}`);
    yield put(func_action.getCommentSc(comment.data));
  } catch (error) {
    yield put(func_action.getCommentEr(error));
  }
}
