import {
  CHANGE_FILTER_ORDER,
  GET_ORDER_ALL_SC,
  GET_ORDER_SC,
} from "../../constants/actionConst";

const initState = {
  orders: [],
  pagi: {
    _page: 1,
    _limit: 9,
    _totalRows: 10,
  },
  filter: {},
};

export default function ordersReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ORDER_SC:
      newState = {
        ...newState,
        orders: action.payload.data,
        pagi: action.payload.pagination,
      };
      return { ...newState };

    case GET_ORDER_ALL_SC: {
      newState = {
        ...newState,
        orders: action.payload,
      };
      return { ...newState };
    }
    case CHANGE_FILTER_ORDER: {
      newState = { ...newState, filter: { ...action.payload } };
      state = { ...newState };
      return { ...state };
    }
    default:
      return { ...state };
  }
}
