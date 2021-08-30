import axios from "axios";
import { parseCookies } from "nookies";

export function buildApi(ctx = undefined) {
  const api = axios.create({
    baseURL: "http://localhost:3323",
  });

  const cookies = parseCookies(ctx);
  const token = cookies["dash.money.auth"];

  if (token) {
    api.defaults.headers["authorization"] = `Bearer ${token}`;
  }

  return api;
}
