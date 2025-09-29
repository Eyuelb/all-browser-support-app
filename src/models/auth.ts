import { TUser } from "./user";

export type TLoginArg = {
  email: string;
  password: string;
};
export type TLoginRes = {
  refresh_token: string
  access_token: string;
  user: TUser;
};
export type TRegisterArg = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
};

export type TRegisterRes = {
  accessToken: string;
  newUser: TUser;
};
