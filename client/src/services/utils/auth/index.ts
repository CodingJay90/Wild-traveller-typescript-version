import jwt_decode from "jwt-decode";
import { getCookie } from "../cookiesFunctions";

export const decodeToken = (token: string) => {
  try {
    const decoded: any = jwt_decode(token);
    console.log(decoded);
    return decoded;
  } catch (error) {
    return "invalid token";
  }
};

export const checkTokenExpiration = (token: string) => {
  try {
    const decoded: any = decodeToken(token);
    if (decoded.exp < Date.now() / 1000) return true;
    return false;
  } catch (err) {
    return false;
  }
};

export const checkLogin = () => {
  const token = getCookie("auth_token");
  return !!token && !checkTokenExpiration(token);
};

// export const getUser = async (token: string) => {
//   let res = await getApi(`${BASE_API_URL}/user`, token);
//   return res.user;
// };
