"use client";

import {API} from "@/lib/API";
import {takeLatest,put} from "redux-saga/effects";

function* userSaga(action: any) {
  const {email,name,password,type,rememberMe} = action.payload;

  const login = {email,password};
  const register = {name,email,password};

  const data = type === "login" ? login : register;

  try {
    const res: {data: any} = yield API.post(`/auth/${type}`,data);
    const userdata: any = {email};
    if(type === "login") userdata.name = res.data.name;
    else userdata.name = name;
    if(rememberMe) localStorage.setItem("netflix",JSON.stringify(userdata));
    yield put({type: "LOGIN",payload: userdata});
  } catch(error: any) {
    yield put({type: "LOGIN_FAILED",payload: error.response.data.message});
  }
}

export function* callUser() {
  yield takeLatest("USER_LOGIN",userSaga);
}
