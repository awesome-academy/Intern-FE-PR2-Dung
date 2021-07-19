import { GET_COMMENT_SC } from "../../constants/actionConst";

const initState = {
  comment: [],
  pagination: {
    _limit: 6,
    _page: 1,
    _totalRows: 10,
  },
};

export default function commentReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_COMMENT_SC:
      newState = {
        ...newState,
        comment: action.payload.data,
        pagination: action.payload.pagination,
      };
      return { ...newState };

    default:
      return state;
  }
}
