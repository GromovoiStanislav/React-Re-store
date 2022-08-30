import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";

const logMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log(action.type, getState());
    return next(action);
  };

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware)
);

store.dispatch("HELLO_WORLD");

const myAction = (dispatch) => {
  setTimeout(() => dispatch("DELAYED_ACTION"), 3000);
};

store.dispatch(myAction);

export default store;
