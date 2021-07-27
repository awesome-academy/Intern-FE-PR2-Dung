import { GET_ORDER_SC } from "../../constants/actionConst";

const initState = {
  orders: [],
  pagi: {
    _page: 1,
    _limit: 9,
    _totalRows: 10,
  },
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
    default:
      return { ...state };
  }
}
