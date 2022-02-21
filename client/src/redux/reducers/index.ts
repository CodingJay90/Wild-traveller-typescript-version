import { combineReducers } from "redux";
import authReducer, { AuthState } from "./auth.reducer";
import locationReducer, { LocationState } from "./location.reducer";

export interface Store {
  auth: AuthState;
  location: LocationState;
}

const reducers = combineReducers({
  auth: authReducer,
  location: locationReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
