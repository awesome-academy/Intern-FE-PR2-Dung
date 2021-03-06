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

export const addToCart = (data) => {
  return {
    type: actionType.ADD_TO_CART,
    payload: data,
  };
};

export const changeCart = (data) => {
  return {
    type: actionType.CHANGE_CART,
    payload: data,
  };
};

export const deleteCart = (data) => {
  return {
    type: actionType.DELETE_CART,
    payload: data,
  };
};

export const removeCart = () => {
  return {
    type: actionType.REMOVE_CART,
  };
};

export const addOrder = (data) => {
  return {
    type: actionType.ADD_ORDER,
    payload: data,
  };
};

export const addOrderEr = (data) => {
  return {
    type: actionType.ADD_ORDER_ER,
    payload: data,
  };
};

export const editUser = (data) => {
  return { type: actionType.EDIT_USER, payload: data };
};
export const editUserSc = (data) => {
  return { type: actionType.EDIT_USER_SC, payload: data };
};
export const editUserEr = (data) => {
  return { type: actionType.EDIT_USER_ER, payload: data };
};

export const getOrder = (data) => {
  return { type: actionType.GET_ORDER, payload: data };
};
export const getOrderSc = (data) => {
  return { type: actionType.GET_ORDER_SC, payload: data };
};
export const getOrderEr = (data) => {
  return { type: actionType.GET_ORDER_ER, payload: data };
};

export const getProductSearch = (filter) => {
  return {
    type: actionType.GET_PRODUCT_SEARCH,
    payload: filter,
  };
};

export const getProductSearchSc = (data) => {
  return {
    type: actionType.GET_PRODUCT_SEARCH_SC,
    payload: data,
  };
};

export const getProductSearchEr = (err) => {
  return {
    type: actionType.GET_PRODUCT_SEARCH_ER,
    payload: err,
  };
};
export const getOrderAll = () => {
  return { type: actionType.GET_ORDER_ALL };
};

export const getOrderAllSc = (data) => {
  return { type: actionType.GET_ORDER_ALL_SC, payload: data };
};
export const getOrderAllEr = (data) => {
  return { type: actionType.GET_ORDER_ALL_ER, payload: data };
};

export const deleteUser = (data) => {
  return { type: actionType.DELETE_USER, payload: data };
};

export const deleteUserEr = (data) => {
  return { type: actionType.DELETE_USER_ER, payload: data };
};

export const deleteProduct = (data) => {
  return { type: actionType.DELETE_PRODUCT, payload: data };
};

export const deleteProductEr = (data) => {
  return { type: actionType.DELETE_PRODUCT_ER, payload: data };
};

export const addProduct = (data) => {
  return { type: actionType.ADD_PRODUCT, payload: data };
};

export const addProductEr = (data) => {
  return { type: actionType.ADD_PRODUCT_ER, payload: data };
};

export const editProduct = (data) => {
  return { type: actionType.EDIT_PRODUCT, payload: data };
};

export const editProductEr = (data) => {
  return { type: actionType.EDIT_PRODUCT_ER, payload: data };
};
export const addWishList = (data) => {
  return {
    type: actionType.ADD_WISH_LIST,
    payload: data,
  };
};

export const removeWishList = (data) => {
  return {
    type: actionType.REMOVE_WISH_LIST,
    payload: data,
  };
};

export const getDiscount = (data) => {
  return { type: actionType.GET_DISCOUNT, payload: data };
};
export const getDiscountSc = (data) => {
  return { type: actionType.GET_DISCOUNT_SC, payload: data };
};
export const getDiscountEr = (data) => {
  return { type: actionType.GET_DISCOUNT_ER, payload: data };
};

export const editDiscount = (data) => {
  return { type: actionType.EDIT_DISCOUNT, payload: data };
};
export const editDiscountEr = (data) => {
  return { type: actionType.EDIT_DISCOUNT_ER, payload: data };
};

export const editOrder = (data) => {
  return { type: actionType.EDIT_ORDER, payload: data };
};
export const editOrderEr = (data) => {
  return { type: actionType.EDIT_ORDER_ER, payload: data };
};

export const deleteOrder = (data) => {
  return { type: actionType.DELETE_ORDER, payload: data };
};
export const deleteOrderEr = (data) => {
  return { type: actionType.DELETE_ORDER_ER, payload: data };
};

export const changeFilterOrder = (data) => {
  return {
    type: actionType.CHANGE_FILTER_ORDER,
    payload: data,
  };
};
