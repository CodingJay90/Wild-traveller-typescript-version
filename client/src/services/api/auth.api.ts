import axios from "axios";
import { getCookie } from "../utils/cookiesFunctions";
const token = getCookie("auth_token");

const authClient = axios.create({
  baseURL: "http://localhost:5000/api/v2/auth/",
  timeout: 0,
  headers: {
    Accept: "application/vnd.GitHub.v3+json",
    Authorization: token || "",
  },
});

export const registerUserApi = async (url: string, body: object) =>
  await authClient.post(url, body);

export const loginUserApi = async (url: string, body: object) =>
  await authClient.post(url, body);

export const updateUserApi = async (url: string, body: object) =>
  await authClient.put(url, body);

export const deleteUserApi = async (url: string) =>
  await authClient.delete(url);

export const loadUserApi = async (url: string) => await authClient.get(url);

export const getSpecificUserApi = async (url: string) =>
  await authClient.get(url);
