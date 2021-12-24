import { Dispatch } from "redux";
import {
  deleteUserApi,
  getSpecificUserApi,
  loadUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
} from "../../api/auth.api";
import { IUser } from "../../utils/interface";
import { ActionType } from "../action-types/auth.types";
import { AuthAction } from "../actions-interface/auth.interface";

export const registerUser =
  (userDetails: IUser) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data } = await registerUserApi("user/", userDetails);
      dispatch({ type: ActionType.REGISTER_USER, payload: data });
    } catch (error: any) {
      dispatch({ type: ActionType.REGISTER_USER_FAIL, payload: error });
    }
  };

export const loginUser =
  (userDetails: IUser) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data } = await loginUserApi("sessions/", userDetails);
      dispatch({ type: ActionType.LOGIN_USER, payload: data });
    } catch (error: any) {
      dispatch({ type: ActionType.LOGIN_USER_FAIL, payload: error });
    }
  };

export const updateUser =
  (userDetails: IUser) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data } = await updateUserApi("update/", userDetails);
      dispatch({ type: ActionType.UPDATE_USER, payload: data });
    } catch (error: any) {
      console.log(error);
    }
  };

export const deleteUser = () => async (dispatch: Dispatch<AuthAction>) => {
  try {
    const { data } = await deleteUserApi("delete/");
    dispatch({ type: ActionType.DELETE_USER, payload: data });
  } catch (error: any) {
    dispatch({ type: ActionType.LOGIN_USER_FAIL, payload: error });
  }
};

export const loadUser = () => async (dispatch: Dispatch<AuthAction>) => {
  try {
    const { data } = await loadUserApi("sessions/");
    dispatch({ type: ActionType.USER_LOADED, payload: data });
  } catch (error: any) {
    dispatch({ type: ActionType.USER_LOADED_FAIL, payload: error });
  }
};

export const getSpecificUser =
  (id: string) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data } = await getSpecificUserApi(`sessions/${id}`);
      dispatch({ type: ActionType.USER_LOADED, payload: data });
    } catch (error: any) {
      dispatch({ type: ActionType.USER_LOADED_FAIL, payload: error });
    }
  };

export const clearError = () => (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.CLEAR_ERROR,
  });
};
