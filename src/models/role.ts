import { TResource } from "./resource";

export type TRole = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  active: boolean;
  resources: TResource[];
};
