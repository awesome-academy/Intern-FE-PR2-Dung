import { call, takeLatest, put } from "redux-saga/effects";
import { postUser } from "../../api/usersApi";
import * as types from "../../constants/actionConst";
import { KEY_IS_LOGIN, KEY_TOKEN, URL_USERS } from "../../constants/urlConst";
import * as func_type from "../action";
import jwt_decode from "jwt-decode";
import { getData, patch } from "../../api/productApi/productApi";
import queryString from "query-string";

export default function* userSaga() {
  yield takeLatest(types.LOGIN, login);
  yield takeLatest(types.SIGN_UP, signUp);
  yield takeLatest(types.GET_USER, getUser);
  yield takeLatest(types.EDIT_USER, editUser);
}

function* login(action) {
  try {
    const res = yield call(postUser, `${URL_USERS}/login`, action.payload);
    localStorage.setItem(KEY_TOKEN, res.data.accessToken);
    localStorage.setItem(KEY_IS_LOGIN, true);
    var data = jwt_decode(res.data.accessToken);
    const dataUserLogin = yield call(
      getData,
      `${URL_USERS}/users?email=${data.email}`
    );
    yield put(func_type.loginSc(dataUserLogin.data));
  } catch (error) {
    yield put(func_type.loginEr(error));
  }
}

function* signUp(action) {
  try {
    yield call(postUser, `${URL_USERS}/signup`, action.payload);
    yield put(func_type.signUpSc());
  } catch (error) {
    yield put(func_type.signUpEr());
  }
}

function* getUser(action) {
  try {
    const param = queryString.stringify(action.payload);
    const data = yield call(getData, `${URL_USERS}/users?${param}`);
    yield put(func_type.getUserSc(data));
  } catch (error) {
    yield put(func_type.getUserEr(error));
  }
}

function* editUser(action) {
  try {
    const user = yield call(
      patch,
      `${URL_USERS}/users/${action.payload.id}`,
      action.payload.data
    );
    yield put(func_type.editUserSc(user.data));
  } catch (error) {
    yield put(func_type.editUserEr(error));
  }
}
