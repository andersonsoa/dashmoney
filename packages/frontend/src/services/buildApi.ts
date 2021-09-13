import { useToast } from "@chakra-ui/toast";
import axios, { AxiosError, AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import { signout } from "../contexts/AuthContext";

async function sucessHandler(res: AxiosResponse) {
  return res;
}

async function errorHandler(error: AxiosError) {
  if (error.response.status === 401) {
    if (process.browser) {
      signout();
    } else {
      return Promise.reject(new Error("token inválido"));
    }
  }
  return Promise.reject(error);
}

export function buildApi(ctx = undefined) {
  const api = axios.create({
    baseURL: "http://localhost:3323",
  });

  const cookies = parseCookies(ctx);
  const token = cookies["dash.money.auth"];

  if (token) {
    api.defaults.headers["authorization"] = `Bearer ${token}`;
  }

  api.interceptors.response.use(sucessHandler, errorHandler);

  return api;
}
