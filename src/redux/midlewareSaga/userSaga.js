import { call, takeLatest, put } from "redux-saga/effects";
import { postUser } from "../../api/usersApi";
import { GET_USER, LOGIN, SIGN_UP } from "../../constants/actionConst";
import { KEY_IS_LOGIN, KEY_TOKEN, URL_USERS } from "../../constants/urlConst";
import {
  getUserEr,
  getUserSc,
  loginEr,
  loginSc,
  signUpEr,
  signUpSc,
} from "../action";
import jwt_decode from "jwt-decode";
import { getData } from "../../api/productApi/productApi";
import queryString from "query-string";

export default function* userSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(SIGN_UP, signUp);
  yield takeLatest(GET_USER, getUser);
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
    yield put(loginSc(dataUserLogin.data));
  } catch (error) {
    yield put(loginEr(error));
  }
}

function* signUp(action) {
  try {
    yield call(postUser, `${URL_USERS}/signup`, action.payload);
    yield put(signUpSc());
  } catch (error) {
    yield put(signUpEr());
  }
}

function* getUser(action) {
  try {
    const param = queryString.stringify(action.payload);
    const data = yield call(getData, `${URL_USERS}/users?${param}`);
    yield put(getUserSc(data));
  } catch (error) {
    yield put(getUserEr(error));
  }
}
