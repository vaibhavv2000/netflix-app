"use client";

interface user {
  name: string;
  email: string;
  error: string;
}

const user: user = {
  name: "",
  email: "",
  error: "",
};

type action = {
  type: string;
  payload: any;
};

const userReducer = (state = user, action: action) : user => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return { error: "", ...payload };
    case "LOGOUT":
      return { error: "", name: "", email: "" };
    case "LOGIN_FAILED":
      return { error: payload, name: "", email: "" };
    default:
      return state;
  }
};

export default userReducer;
