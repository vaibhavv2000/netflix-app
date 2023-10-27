"use client";

import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import userReducer from "./reducers/userReducer";
import moviesReducer from "./reducers/moviesReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    user: userReducer,
    movies: moviesReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
