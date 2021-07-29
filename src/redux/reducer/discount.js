import { GET_DISCOUNT_SC } from "../../constants/actionConst";

const initState = { discount: [] };

export default function discountReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_DISCOUNT_SC:
      newState = { ...newState, discount: action.payload };
      return { ...newState };

    default:
      return { ...newState };
  }
}
