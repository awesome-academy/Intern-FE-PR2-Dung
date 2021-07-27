import * as actionType from "../../constants/actionConst";

const stateInitial = {
  Product: [],
  ProductSearch: [],
  filter: {},
  pagination: {
    _page: 1,
    _limit: 9,
    _totalRows: 10,
  },
};

export default function productReducer(state = stateInitial, action) {
  let newState = { ...state };
  switch (action.type) {
    case actionType.GET_PRODUCT_SC:
      newState = {
        ...newState,
        Product: action.payload.data,
        pagination: action.payload.pagination,
      };
      return newState;
    case actionType.CHANGE_FILTER:
      state = { ...state, filter: action.payload };
      return state;
    case actionType.GET_PRODUCT_SEARCH_SC:
      newState = { ...newState, ProductSearch: action.payload.data };
      return { ...newState };
    default:
      return state;
  }
}
