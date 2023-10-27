import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.233.174:8000/api",
});
