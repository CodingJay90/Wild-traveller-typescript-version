import { Dispatch } from "redux";
import {
  addLocationApi,
  createCommentApi,
  deleteCommentApi,
  deleteLocationApi,
  getLocationsApi,
  getSpecificCommentApi,
  getSpecificLocationApi,
  updateCommentApi,
  updateLocationApi,
} from "../../api/location.api";
import { ILocation } from "../../utils/LocationInterface";
import { CommentTypes, LocationTypes } from "../action-types/location.types";
import { LocationAction } from "../actions-interface/location.interface";

export const getLocations =
  () => async (dispatch: Dispatch<LocationAction>) => {
    try {
      const { data } = await getLocationsApi("/");
      dispatch({
        type: LocationTypes.FETCH_LOADING,
      });
      dispatch({ type: LocationTypes.FETCH_LOCATION, payload: data });
    } catch (error) {
      dispatch({ type: LocationTypes.THROW_ERROR, payload: error });
    }
  };

export const getSpecificLocation =
  (id: string) => async (dispatch: Dispatch<LocationAction>) => {
    try {
      const { data } = await getSpecificLocationApi(`/${id}`);
      dispatch({
        type: LocationTypes.FETCH_LOADING,
      });
      dispatch({ type: LocationTypes.FETCH_SPECIFIC_LOCATION, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: LocationTypes.THROW_ERROR, payload: error });
    }
  };

export const addLocation =
  (locationDetails: ILocation) =>
  async (dispatch: Dispatch<LocationAction>) => {
    try {
      const { data } = await addLocationApi("/create", locationDetails);
      dispatch({
        type: LocationTypes.FETCH_LOADING,
      });
      dispatch({
        type: LocationTypes.ADD_LOCATION,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: LocationTypes.THROW_ERROR, payload: error });
    }
  };

export const updateLocation =
  (id: string, locationDetails: ILocation) =>
  async (dispatch: Dispatch<LocationAction>) => {
    try {
      const { data } = await updateLocationApi(
        `/update/${id}`,
        locationDetails
      );
      dispatch({
        type: LocationTypes.FETCH_LOADING,
      });
      dispatch({
        type: LocationTypes.UPDATE_LOCATION,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: LocationTypes.THROW_ERROR, payload: error });
    }
  };

export const deleteLocation =
  (id: string) => async (dispatch: Dispatch<LocationAction>) => {
    try {
      const { data } = await deleteLocationApi(`/delete/${id}`);
      dispatch({
        type: LocationTypes.FETCH_LOADING,
      });
      dispatch({
        type: LocationTypes.DELETE_LOCATION,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: LocationTypes.THROW_ERROR, payload: error });
    }
  };

export const sortLocation = () => (dispatch: Dispatch<LocationAction>) => {
  dispatch({
    type: LocationTypes.SORT_LOCATION_BY_NAME,
  });
};

export const sortLocationByDateCreated =
  () => (dispatch: Dispatch<LocationAction>) => {
    dispatch({
      type: LocationTypes.SORT_LOCATION_BY_DATE_CREATED,
    });
  };

//=================================
//COMMENT ACTIONS
//=================================

export const getSpecificComment =
  (id: string, comment_id: string) =>
  async (dispatch: Dispatch<LocationAction>) => {
    try {
      const { data } = await getSpecificCommentApi(
        `/${id}/comment/${comment_id}`
      );
      console.log(data, "object");
      dispatch({
        type: CommentTypes.FETCH_SPECIFIC_COMMENT,
        payload: data.foundComment,
      });
    } catch (error) {
      dispatch({ type: LocationTypes.THROW_ERROR, payload: error });
    }
  };

export const createComment =
  (id: string, commentText: object) =>
  async (dispatch: Dispatch<LocationAction>) => {
    try {
      const { data } = await createCommentApi(
        `/${id}/comment/create`,
        commentText
      );
      dispatch({
        type: CommentTypes.ADD_COMMENT,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: LocationTypes.THROW_ERROR, payload: error });
    }
  };

export const updateComment =
  (id: string, comment_id: string, commentText: object) =>
  async (dispatch: Dispatch<LocationAction>) => {
    try {
      const { data } = await updateCommentApi(
        `/${id}/comment/${comment_id}`,
        commentText
      );
      console.log(commentText);
      dispatch({
        type: CommentTypes.ADD_COMMENT,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: LocationTypes.THROW_ERROR, payload: error });
    }
  };

export const deleteComment =
  (id: string, commentId: string) =>
  async (dispatch: Dispatch<LocationAction>) => {
    try {
      const { data } = await deleteCommentApi(`/${id}/comment/${commentId}`);
      dispatch({
        type: CommentTypes.DELETE_COMMENT,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: LocationTypes.THROW_ERROR, payload: error });
    }
  };

export const setItemsLoading = () => (dispatch: Dispatch<LocationAction>) => {
  return {
    type: LocationTypes.FETCH_LOADING,
  };
};
