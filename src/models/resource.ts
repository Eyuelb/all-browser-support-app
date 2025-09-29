import { TPermission } from "./permission";

export type TResource = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  active: boolean;
  path: string;
  permissions: TPermission[];
};
