import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk), composeEnhancers())
);

export default store;
