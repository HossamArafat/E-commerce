import axios from "axios";
import Cookie from "cookie-universal";
import { baseURL } from "./Api";

const cookie = Cookie();
export const customAxios = axios.create({
  baseURL: baseURL,
});

customAxios.interceptors.request.use(config => {
  const token = cookie.get("accessToken");
  
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});
