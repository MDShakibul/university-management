import { Model } from 'mongoose';

export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange?: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type AuthModel = Model<ILoginUser, Record<string, unknown>>;
