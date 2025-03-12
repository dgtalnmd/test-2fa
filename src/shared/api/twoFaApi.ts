import { api } from ".";
import { SuccessAuthResponse } from "@/shared/types";

type GenerateQrCodeResponse = {
  totpQrCodeUrl: string;
};

type VerifyRequest = {
  totpCode: string;
  tempToken: string;
};

export const twoFaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateQrCode: builder.mutation<GenerateQrCodeResponse, string>({
      query: (tempToken) => ({
        url: "/auth/two-factor/generate-qr-code",
        method: "POST",
        body: { tempToken },
      }),
    }),
    setUp: builder.mutation<SuccessAuthResponse, VerifyRequest>({
      query: (body) => ({
        url: "/auth/two-factor/set-up",
        method: "POST",
        body,
      }),
    }),
    verify: builder.mutation<SuccessAuthResponse, VerifyRequest>({
      query: (body) => ({
        url: "/auth/two-factor/verify",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGenerateQrCodeMutation,
  useSetUpMutation,
  useVerifyMutation,
} = twoFaApi;
