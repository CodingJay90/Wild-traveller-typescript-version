import axios from "axios";
import { getCookie } from "../utils/cookiesFunctions";
const token = getCookie("auth_token");

const locationClient = axios.create({
  baseURL: "https://wild-traveller-v2.herokuapp.com/api/v2/location",
  timeout: 0,
  headers: {
    Accept: "application/vnd.GitHub.v3+json",
    Authorization: token || "",
  },
});

export const getLocationsApi = async (url: string) =>
  await locationClient.get(url);

export const getSpecificLocationApi = async (url: string) =>
  await locationClient.get(url);

export const addLocationApi = async (url: string, body: object) =>
  await locationClient.post(url, body);

export const updateLocationApi = async (url: string, body: object) =>
  await locationClient.put(url, body);

export const deleteLocationApi = async (url: string) =>
  await locationClient.delete(url);

//=================================
//COMMENT API
//=================================
export const getSpecificCommentApi = async (url: string) =>
  await locationClient.get(url);

export const createCommentApi = async (url: string, body: object) =>
  await locationClient.post(url, body);

export const updateCommentApi = async (url: string, textBody: object) =>
  await locationClient.put(url, textBody);

export const deleteCommentApi = async (url: string) =>
  await locationClient.delete(url);
