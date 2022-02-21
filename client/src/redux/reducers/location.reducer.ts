// import { AuthErrors, IUser } from "../../utils/authInterface";
// import { IComment, ILocation } from "../../utils/LocationInterface";
import {
  IComment,
  ILocation,
} from "../../services/utils/interfaces/LocationInterface";
import { ActionType } from "../action-types/auth.types";
import { CommentTypes, LocationTypes } from "../action-types/location.types";
import { AuthAction } from "../actions-interface/auth.interface";
import { LocationAction } from "../actions-interface/location.interface";

export interface LocationState {
  location: ILocation[];
  isLoading: boolean;
  error: string | null;
  specificLocation: ILocation | null;
  specificComment: IComment;
}

const initialState = {
  location: [],
  isLoading: false,
  error: null,
  specificLocation: null,
  specificComment: {} as IComment,
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
        isLoading: false,
        specificLocation: action.payload,
      };
    case LocationTypes.ADD_LOCATION:
      return {
        ...state,
        location: [...state.location, action.payload],
        error: null,
        isLoading: false,
      };
    case LocationTypes.UPDATE_LOCATION:
      return {
        ...state,
        location: state.location.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        isLoading: false,
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
      const foundLocation = state.specificLocation;
      foundLocation?.comment.push(action.payload.comment);
      return {
        ...state,
        location: state.location.map((item) =>
          item._id === action.payload.location_id ? foundLocation : item
        ),
        specificLocation: foundLocation,
      };
    case CommentTypes.DELETE_COMMENT:
      return {
        ...state,
        specificLocation: {
          ...state.specificLocation,
          comment: state.specificLocation?.comment.filter(
            (item) => item._id !== action.payload.comment_id
          ),
        },
      };
    case CommentTypes.UPDATE_COMMENT:
      const updatedComment = state.specificLocation?.comment.map((i) =>
        i._id === action.payload.comment_id ? action.payload.comment : i
      );
      return {
        ...state,
        specificLocation: {
          ...state.specificLocation,
          comment: updatedComment,
        },
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
