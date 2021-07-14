import * as actionType from "../../constants/actionConst";

export const getProduct = (filter) => {
  return {
    type: actionType.GET_PRODUCT,
    payload: filter,
  };
};

export const getProductSc = (data) => {
  return {
    type: actionType.GET_PRODUCT_SC,
    payload: data,
  };
};

export const getProductEr = (err) => {
  return {
    type: actionType.GET_PRODUCT_ER,
    payload: err,
  };
};

export const login = (dataUser) => {
  return {
    type: actionType.LOGIN,
    payload: dataUser,
  };
};

export const loginSc = (data) => {
  return {
    type: actionType.LOGIN_SC,
    payload: data,
  };
};

export const loginEr = () => {
  return {
    type: actionType.LOGIN_ER,
  };
};

export const logout = () => {
  return {
    type: actionType.LOGOUT,
  };
};

export const signUp = (dataUser) => {
  return {
    type: actionType.SIGN_UP,
    payload: dataUser,
  };
};

export const signUpSc = () => {
  return {
    type: actionType.SIGN_UP_SC,
  };
};

export const signUpEr = () => {
  return {
    type: actionType.SIGN_UP_ER,
  };
};
