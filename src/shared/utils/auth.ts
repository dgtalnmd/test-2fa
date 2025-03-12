import { SuccessAuthResponse } from "../types/auth";
import Cookies from "js-cookie";

const COOKIE_TOKEN_NAME = "token";
const COOKIE_REFRESH_TOKEN_NAME = "refreshToken";
const COOKIE_LIFE_DAYS = 7;

export const setAuthCookie = ({ refreshToken, token }: SuccessAuthResponse) => {
  Cookies.set(COOKIE_REFRESH_TOKEN_NAME, refreshToken, {
    expires: COOKIE_LIFE_DAYS,
  });
  Cookies.set(COOKIE_TOKEN_NAME, token, { expires: COOKIE_LIFE_DAYS });
};

export const clearAuthCookie = () => {
  Cookies.remove(COOKIE_REFRESH_TOKEN_NAME);
  Cookies.remove(COOKIE_TOKEN_NAME);
};

export const getToken = () => Cookies.get(COOKIE_TOKEN_NAME) || "";
