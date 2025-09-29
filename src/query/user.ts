import { useFetchQuery } from "@/hooks/useFetchQuery";
import { TUser } from "@/models/user";
import { getBaseUrl } from "@/utils/req";

export const useGetUserById = (id?: string) =>
  useFetchQuery<TUser, unknown>({
    key: ["user-manage", id],
    fetchParams: {
      url: getBaseUrl(
        `/auth/profile`,
      ),
      method: "GET",
    },
    options: {
      enabled: !!id,
    },
  });

export const useGetUserProfile = () =>
  useFetchQuery<TUser, unknown>({
    key: ["user-manage"],
    fetchParams: {
      url: getBaseUrl(
        `/auth/profile`,
      ),
      method: "GET",
    },

  });

