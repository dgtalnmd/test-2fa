import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { api } from ".";
import {
  AuthRequest,
  SuccessAuthResponse,
  TwoFaRequiredResponse,
} from "@/shared/types";

type AuthResponse = SuccessAuthResponse | TwoFaRequiredResponse;
type TransformedAuthResponse = AuthResponse & { statusCode: number };

export const authenticationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation<TransformedAuthResponse, AuthRequest>({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        body,
      }),
      transformResponse: (
        response: AuthResponse,
        meta: FetchBaseQueryMeta | undefined
      ) => ({
        ...response,
        statusCode: meta?.response?.status || 0,
      }),
    }),
  }),
});

export const { useAuthMutation } = authenticationApi;
