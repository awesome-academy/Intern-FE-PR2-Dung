import { ADD_WISH_LIST, REMOVE_WISH_LIST } from "../../constants/actionConst";
import { KEY_WISH_LIST } from "../../constants/urlConst";

const initState = {
  wishList: JSON.parse(localStorage.getItem(KEY_WISH_LIST)) || [],
};

export default function WishListReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ADD_WISH_LIST: {
      newState = {
        ...newState,
        wishList: [...newState.wishList, action.payload],
      };
      localStorage.setItem(KEY_WISH_LIST, JSON.stringify(newState.wishList));
      return { ...newState };
    }
    case REMOVE_WISH_LIST: {
      const index = newState.wishList.findIndex(
        (item) => item.id === action.payload
      );
      newState.wishList.splice(index, 1);
      newState = { ...newState, wishList: [...newState.wishList] };
      localStorage.setItem(KEY_WISH_LIST, JSON.stringify(newState.wishList));

      return { ...newState };
    }
    default:
      return { ...newState };
  }
}
