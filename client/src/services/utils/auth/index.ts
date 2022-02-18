import jwt_decode from "jwt-decode";
import { deleteCookie, getCookie } from "../cookiesFunctions";

interface Decoded {
  exp: number;
  iat: number;
  email: {
    email: string;
    username: string;
    _id: string;
  };
}

export const decodeToken = (token: string) => {
  try {
    const decoded: Decoded = jwt_decode(token);
    console.log(decoded);
    return decoded;
  } catch (error) {
    return "invalid token";
  }
};

export const checkTokenExpiration = (token: string) => {
  try {
    const decoded = decodeToken(token) as Decoded;
    if (decoded.exp < Date.now() / 1000) {
      deleteCookie("auth_token");
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const checkLogin = (token: string) => {
  // const token: string = getCookie("auth_token");
  return !!token && !checkTokenExpiration(token);
};
