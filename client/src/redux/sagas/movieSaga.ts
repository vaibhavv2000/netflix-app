"use client";

import {API} from "@/lib/API";
import {takeLatest,put} from "redux-saga/effects";

function* movieSaga(action: any) {
  try {
    const movies = async () => {
      let res = await API.get(`/movie/movies`);
      let data = await res.data;
      return data;
    };

    const userList = async () => {
     let res = await API.get(`/movie/getlist?email=${action.payload}`);
     let data = await res.data;
     return data;
    };

    const data: [[],[]] = yield Promise.all([movies(),userList()]);

    yield put({type: "ADD_MOVIES",payload: data[0]});
    yield put({type: "ADD_MY_LIST",payload: data[1]});
  } catch(error: any) {
    console.log(error.response.data);
  }
}

export function* callMovies() {
  yield takeLatest("FETCH_MOVIES",movieSaga);
}
