import { IUser } from "../../services/utils/interfaces/authInterface";
import { ActionType } from "../action-types/auth.types";

interface AuthPayload extends IUser {
  user: IUser;
  token: string;
  success: boolean;
  keepSignedIn: boolean;
}

interface RegisterAction {
  type: ActionType.REGISTER_USER;
  payload: AuthPayload;
}
interface RegisterActionFail {
  type: ActionType.REGISTER_USER_FAIL;
  payload: AuthPayload;
}
interface LoginAction {
  type: ActionType.LOGIN_USER;
  payload: AuthPayload;
}
interface LoginActionFail {
  type: ActionType.LOGIN_USER_FAIL;
  payload: AuthPayload;
}
interface LoadUserAction {
  type: ActionType.USER_LOADED;
  payload: object;
}
interface LoadUserFail {
  type: ActionType.USER_LOADED_FAIL;
  payload: object;
}

interface UpdateUserAction {
  type: ActionType.UPDATE_USER;
  payload: object;
}

interface DeleteUserAction {
  type: ActionType.DELETE_USER;
  payload: object;
}

interface GetSpecificUser {
  type: ActionType.GET_SPECIFIC_USER;
  payload: IUser;
}
interface ClearError {
  type: ActionType.CLEAR_ERROR;
  payload: IUser;
}

interface UserLoading {
  type: ActionType.USER_LOADING;
}

interface ResetAuthState {
  type: ActionType.RESET_AUTH_STATE;
}

export type AuthAction =
  | LoginAction
  | LoadUserAction
  | LoginActionFail
  | RegisterAction
  | RegisterActionFail
  | UpdateUserAction
  | LoadUserFail
  | GetSpecificUser
  | DeleteUserAction
  | ClearError
  | UserLoading
  | ResetAuthState;
