import { IUser } from "../../utils/interface";
import { ActionType } from "../action-types/auth.types";
import { AuthAction } from "../actions-interface/auth.interface";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  errMsg: string;
  currentUser: IUser | string;
  success: boolean;
  specificUser: IUser | null;
  isLoading: boolean;
}

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  errMsg: "",
  currentUser: "",
  success: false,
  specificUser: null,
  isLoading: false,
};

const reducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
    case ActionType.REGISTER_USER:
      localStorage.setItem("auth_token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        errMsg: "",
        success: null,
        currentUser: action.payload.username,
      };
    case ActionType.UPDATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };
    case ActionType.DELETE_USER:
      localStorage.removeItem("auth_token");
      return {
        ...state,
        currentUser: null,
        isAuthenticated: null,
      };
    case ActionType.USER_LOADED:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ActionType.GET_SPECIFIC_USER:
      return {
        ...state,
        specificUser: action.payload,
        isLoading: false,
      };
    case ActionType.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.LOGIN_USER_FAIL:
    case ActionType.REGISTER_USER_FAIL:
      localStorage.removeItem("auth_token");
      return {
        ...state,
        isAuthenticated: null,
        token: null,
        errMsg: action.payload,
        success: false,
      };
    case ActionType.USER_LOADED_FAIL:
      return {
        ...state,
        isAuthenticated: null,
        token: null,
      };

    case ActionType.CLEAR_ERROR: {
      return {
        ...state,
        success: null,
        errMsg: "",
        currentUser: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
