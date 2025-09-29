import { TUser } from "@/models/user";

export type Session = {
  user: TUser | undefined;
  token: JWT | undefined;
  account: Account | undefined;
};

export type Account = TUser;

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  stripeCustomerId?: string | null;
};

export interface JWT {
  access_token: string;
  refresh_token: string;
}

export type AuthContextType = {
  session: Session;
  isSignedIn: boolean;
  setSession: (data: Session) => void;
  signOut: () => Promise<void>;
  allowedResources: string[];
  currentPermissions: string[];
};
