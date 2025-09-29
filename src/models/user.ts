import { TRole } from "./role";

export type TUser = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  image?: string;
  active: boolean
  locale: string
  roles?: TRole[];
  agent_id?: string;
};
