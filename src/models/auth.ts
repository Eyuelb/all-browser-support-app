import { TUser } from "./user";

export type TLoginArg = {
  phoneNumber: string;
  password: string;
};
export type TLoginRes = {
  refresh_token: string;
  access_token: string;
  currentUser: TUser;
};
export type TRegisterArg = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
};

export type TRegisterRes = {
  accessToken: string;
  currentUser: TUser;
};
