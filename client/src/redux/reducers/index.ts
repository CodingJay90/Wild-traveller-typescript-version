import { combineReducers } from "redux";
import authReducer, { AuthState } from "./auth.reducer";

export interface Store {
  auth: AuthState;
}

const reducers = combineReducers({
  auth: authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
