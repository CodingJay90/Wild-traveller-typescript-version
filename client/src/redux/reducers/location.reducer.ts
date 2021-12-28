import { AuthErrors, IUser } from "../../utils/authInterface";
import { ILocation } from "../../utils/LocationInterface";
import { ActionType } from "../action-types/auth.types";
import { CommentTypes, LocationTypes } from "../action-types/location.types";
import { AuthAction } from "../actions-interface/auth.interface";
import { LocationAction } from "../actions-interface/location.interface";

export interface LocationState {
  location: ILocation[];
  isLoading: boolean;
  error: string | null;
  specificLocation: ILocation[];
  specificComment: ILocation[];
}

const initialState = {
  location: [],
  isLoading: false,
  error: null,
  specificLocation: [],
  specificComment: [],
};

const reducer = (
  state: LocationState = initialState,
  action: LocationAction
) => {
  switch (action.type) {
    //   Locations
    case LocationTypes.FETCH_LOCATION:
      return {
        ...state,
        location: action.payload,
        isLoading: false,
      };
    case LocationTypes.FETCH_SPECIFIC_LOCATION:
      return {
        ...state,
        specificLocation: action.payload,
      };
    case LocationTypes.ADD_LOCATION:
      return {
        ...state,
        location: [...state.location, action.payload],
        error: null,
      };
    case LocationTypes.UPDATE_LOCATION:
      return {
        ...state,
        location: state.location.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case LocationTypes.DELETE_LOCATION:
      return {
        ...state,
        location: state.location.filter((item) => item._id !== action.payload),
      };
    //==========
    //Comments
    //==========
    case CommentTypes.FETCH_SPECIFIC_COMMENT:
      return {
        ...state,
        specificComment: action.payload,
      };
    case CommentTypes.ADD_COMMENT:
      return {
        ...state,
        location: [
          ...state.location,
          state.location.map((item) => item.comment.push(action.payload)),
        ],
      };
    case CommentTypes.DELETE_COMMENT:
      return {
        ...state,
        location: [
          ...state.location,
          state.location.map((item) =>
            item.comment.filter((item) => item._id !== action.payload)
          ),
        ],
      };
    case CommentTypes.UPDATE_COMMENT:
      return {
        ...state,
        location: [
          ...state.location,
          state.location.map((item) =>
            item.comment.map((i) =>
              i._id !== action.payload._id ? action.payload : item
            )
          ),
        ],
      };
    //MISC
    case LocationTypes.FETCH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LocationTypes.THROW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LocationTypes.SORT_LOCATION_BY_NAME:
      return {
        ...state,
        location: state.location.sort((a, b) => {
          if (a.location.toLowerCase() < b.location.toLowerCase()) return -1;
          if (a.location.toLowerCase() > b.location.toLowerCase()) return 1;
          return 0;
        }),
      };
    case LocationTypes.SORT_LOCATION_BY_DATE_CREATED:
      return {
        ...state,
        location: state.location.sort((a, b) => {
          if (a.createdAt < b.createdAt) return -1;
          if (a.createdAt > b.createdAt) return 1;
          return 0;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
