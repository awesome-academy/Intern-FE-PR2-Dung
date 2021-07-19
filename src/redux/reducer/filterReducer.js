import * as types from "../../constants/actionConst";

const init = {
  brand: [],
  categories: [],
  tag: [],
  size: [],
};

export default function filterReducer(state = init, action) {
  let newState = { ...state };
  switch (action.type) {
    case types.GET_BRAND_SC:
      newState = { ...newState, brand: action.payload };
      return newState;
    case types.GET_CATEGORIES_SC:
      newState = { ...newState, categories: action.payload };
      return newState;
    case types.GET_TAG_SC:
      newState = { ...newState, tag: action.payload };
      return newState;
    case types.GET_SIZE_SC:
      newState = { ...newState, size: action.payload };
      return newState;
    default:
      return newState;
  }
}
