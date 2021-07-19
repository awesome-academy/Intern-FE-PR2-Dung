import * as Types from "../../constants/actionConst";

const init = {
  isLoading: false,
};

export default function loadingReducer(state = init, action) {
  let newState = { ...state };
  switch (action.type) {
    case Types.ADD_LOADING:
      newState = { ...newState, isLoading: true };
      return { ...newState };
    case Types.CANCEL_LOADING:
      newState = { ...newState, isLoading: false };
      return { ...newState };
    default:
      return state;
  }
}
