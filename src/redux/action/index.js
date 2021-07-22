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

export const changeFilter = (filter) => {
  return {
    type: actionType.CHANGE_FILTER,
    payload: filter,
  };
};

export const addLoading = () => {
  return {
    type: actionType.ADD_LOADING,
  };
};

export const cancelLoading = () => {
  return {
    type: actionType.CANCEL_LOADING,
  };
};

export const getBrand = () => {
  return { type: actionType.GET_BRAND };
};
export const getBrandSc = (brand) => {
  return { type: actionType.GET_BRAND_SC, payload: brand };
};
export const getBrandEr = (brand) => {
  return { type: actionType.GET_BRAND_ER, payload: brand };
};

export const getCategories = () => {
  return { type: actionType.GET_CATEGORIES };
};
export const getCategoriesSc = (categories) => {
  return { type: actionType.GET_CATEGORIES_SC, payload: categories };
};
export const getCategoriesEr = (categories) => {
  return { type: actionType.GET_CATEGORIES_ER, payload: categories };
};

export const getSize = () => {
  return { type: actionType.GET_SIZE };
};
export const getSizeSc = (size) => {
  return { type: actionType.GET_SIZE_SC, payload: size };
};
export const getSizeEr = (size) => {
  return { type: actionType.GET_SIZE_ER, payload: size };
};

export const getTag = () => {
  return { type: actionType.GET_TAG };
};
export const getTagSc = (tag) => {
  return { type: actionType.GET_TAG_SC, payload: tag };
};
export const getTagEr = (tag) => {
  return { type: actionType.GET_TAG_ER, payload: tag };
};

export const getComment = (data) => {
  return { type: actionType.GET_COMMENT, payload: data };
};
export const getCommentSc = (data) => {
  return { type: actionType.GET_COMMENT_SC, payload: data };
};
export const getCommentEr = (data) => {
  return { type: actionType.GET_COMMENT_ER, payload: data };
};

export const addComment = (data) => {
  return { type: actionType.ADD_COMMENT, payload: data };
};
export const addCommentSc = (data) => {
  return { type: actionType.ADD_COMMENT_SC, payload: data };
};
export const addCommentEr = (data) => {
  return { type: actionType.ADD_COMMENT_ER, payload: data };
};

export const getUser = (data) => {
  return { type: actionType.GET_USER, payload: data };
};
export const getUserSc = (data) => {
  return { type: actionType.GET_USER_SC, payload: data };
};
export const getUserEr = (data) => {
  return { type: actionType.GET_USER_ER, payload: data };
};
