export type AuthRequest = {
  email: string;
  password: string;
};

export type SuccessAuthResponse = {
  token: string;
  refreshToken: string;
};

export type TwoFaRequiredResponse = {
  tempToken: string;
  twoFactorSetupRequired: boolean;
};
