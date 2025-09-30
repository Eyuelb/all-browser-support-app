import { useFetchQuery } from "@/hooks/useFetchQuery";
import type { TUser } from "@/models/user";
import { getBaseUrl } from "@/utils/req";

export const useGetUserById = (id?: string, isAuthorized?: boolean) =>
  useFetchQuery<TUser, unknown>({
    key: ["user-manage", id],
    fetchParams: {
      url: getBaseUrl(`/user-log/me`),
      method: "GET",
    },
    options: {
      enabled: !!id && !!isAuthorized,
    },
  });

export const useGetUserProfile = () =>
  useFetchQuery<TUser, unknown>({
    key: ["user-manage"],
    fetchParams: {
      url: getBaseUrl(`/user-manage`),
      method: "GET",
    },
  });
