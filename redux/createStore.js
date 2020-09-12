import _ from "lodash";
import { all, spawn } from "redux-saga/effects";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { sagas, reducers } from "./modules";
import middlewares from "./middlewares";

function* rootSaga() {
  yield all(_.map(sagas, (saga) => spawn(saga)));
}

function createReduxStore() {
  const initialState = {};
  const sagaMiddleware = createSagaMiddleware();
  const middlewareList = [...middlewares, sagaMiddleware];
  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewareList))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

export default createReduxStore;
