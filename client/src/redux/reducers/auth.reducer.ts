import {
  deleteCookie,
  getCookie,
  setCookie,
} from "../../services/utils/cookiesFunctions";
import {
  AuthErrors,
  IUser,
} from "../../services/utils/interfaces/authInterface";
import { ActionType } from "../action-types/auth.types";
import { AuthAction } from "../actions-interface/auth.interface";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: AuthErrors | null;
  currentUser: IUser | null;
  success: boolean | null;
  specificUser: IUser | null;
  isLoading: boolean;
}

const initialState = {
  isAuthenticated: false,
  token: getCookie("auth_token"),
  error: null,
  currentUser: null,
  success: null,
  specificUser: null,
  isLoading: false,
};

const reducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
    case ActionType.REGISTER_USER:
      console.log(action.payload);
      if (action.payload.keepSignedIn)
        setCookie("auth_token", action.payload.token, 1);
      // if (action.payload.keepSignedIn) setCookie("keepSignedIn", "true", 1);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        error: null,
        success: true,
        currentUser: action.payload.user,
        isLoading: false,
      };
    case ActionType.UPDATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };
    case ActionType.DELETE_USER:
      deleteCookie("auth_token");
      return {
        ...state,
        currentUser: null,
        isAuthenticated: null,
      };
    case ActionType.USER_LOADED:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case ActionType.GET_SPECIFIC_USER:
      console.log(action.payload);
      return {
        ...state,
        specificUser: action.payload,
        isLoading: false,
        error: null,
      };
    case ActionType.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.LOGIN_USER_FAIL:
    case ActionType.REGISTER_USER_FAIL:
      // localStorage.removeItem("auth_token");
      deleteCookie("auth_token");
      return {
        ...state,
        isAuthenticated: null,
        token: null,
        error: action.payload,
        success: false,
        isLoading: false,
      };
    case ActionType.USER_LOADED_FAIL:
      return {
        ...state,
        isAuthenticated: null,
        error: action.payload,
      };

    case ActionType.CLEAR_ERROR:
      return {
        ...state,
        success: null,
        error: null,
      };
    case ActionType.RESET_AUTH_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
