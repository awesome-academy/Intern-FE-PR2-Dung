import * as actionType from "../../constants/actionConst";
import { KEY_IS_LOGIN } from "../../constants/urlConst";

const initState = {
  users: [],
  isAuthen: false,
  loginEr: false,
  isLogin: localStorage.getItem(KEY_IS_LOGIN) || false,
  statusSignUp: undefined,
};

export default function UserReducer(state = initState, action) {
  let newState = { ...state };
  switch (action.type) {
    case actionType.LOGIN_SC:
      newState = { ...newState, users: action.payload };
      newState.isLogin = true;
      if (newState.users[0].idRole === "2") newState.isAuthen = true;
      newState = { ...newState };
      return newState;
    case actionType.LOGIN_ER:
      newState = { ...newState, loginEr: true };
      return newState;
    case actionType.LOGOUT:
      newState = {
        ...newState,
        isLogin: false,
        isAuthen: false,
      };
      return newState;
    case actionType.SIGN_UP_ER:
      newState = { ...newState, statusSignUp: false };
      return newState;
    case actionType.SIGN_UP_SC:
      newState = { ...newState, statusSignUp: true };
      return newState;
    default:
      return state;
  }
}
