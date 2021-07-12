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
