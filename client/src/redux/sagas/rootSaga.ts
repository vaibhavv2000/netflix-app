"use client";

import { all } from "redux-saga/effects";
import { callUser } from "./userSaga";
import { callMovies } from "./movieSaga";

function* rootSaga() {
  yield all([callUser(), callMovies()]);
}

export default rootSaga;
