import * as actionType from "../../constants/actionConst";

const stateInitial = {
  Product: [],
};

export default function ProductReducer(state = stateInitial, action) {
  let newState = { ...state };
  switch (action.type) {
    case actionType.GET_PRODUCT_SC:
      newState = { ...newState, Product: action.payload.data };
      return newState;
    default:
      return state;
  }
}
