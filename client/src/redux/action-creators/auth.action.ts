import { Dispatch } from "redux";
import {
  deleteUserApi,
  getSpecificUserApi,
  loadUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
} from "../../services/api/auth.api";
import {
  IUser,
  IUserForm,
} from "../../services/utils/interfaces/authInterface";
import { ActionType } from "../action-types/auth.types";
import { AuthAction } from "../actions-interface/auth.interface";

export const registerUser =
  (userDetails: IUser, keepSignedIn: boolean) =>
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: ActionType.USER_LOADING });
      const { data } = await registerUserApi("users/", userDetails);
      dispatch({
        type: ActionType.REGISTER_USER,
        payload: { ...data, keepSignedIn },
      });
    } catch (error: any) {
      dispatch({ type: ActionType.USER_LOADING });
      dispatch({
        type: ActionType.REGISTER_USER_FAIL,
        payload: error.response.data,
      });
    }
  };

export const loginUser =
  (userDetails: IUser, keepSignedIn: boolean) =>
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data } = await loginUserApi("sessions/", userDetails);
      dispatch({
        type: ActionType.LOGIN_USER,
        payload: { ...data, keepSignedIn },
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.LOGIN_USER_FAIL,
        payload: error.response.data,
      });
    }
  };

export const updateUser =
  (userDetails: IUserForm) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data } = await updateUserApi("/user/update/", userDetails);
      dispatch({ type: ActionType.UPDATE_USER, payload: data.updatedUser });
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
      dispatch({ type: ActionType.USER_LOADING });
      const { data } = await getSpecificUserApi(`sessions/${id}`);
      const userData = {
        ...data.user,
        comments: data.comments,
        locations: data.locations,
      };
      dispatch({ type: ActionType.GET_SPECIFIC_USER, payload: userData });
    } catch (error: any) {
      dispatch({ type: ActionType.USER_LOADED_FAIL, payload: error });
    }
  };

export const clearError = () => (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.CLEAR_ERROR,
  });
};

export const setLoading = () => {
  return {
    type: "USER_LOADING",
  };
};

export const resetState = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.RESET_AUTH_STATE });
};
