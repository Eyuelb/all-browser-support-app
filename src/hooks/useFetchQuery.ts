import { httpGet } from "@/utils/axios/services";
import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

interface FetchParams<TArgs> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: TArgs;
  headers?: HeadersInit;
  params?: Record<string, unknown>;
}

interface UseFetchParams<TResponse, TArgs> {
  key: QueryKey;
  fetchParams: FetchParams<TArgs>;
  options?: Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">;
}

export function useFetchQuery<TResponse, TArgs>({
  key,
  fetchParams,
  options,
}: UseFetchParams<TResponse, TArgs>) {
  return useQuery<TResponse>({
    queryKey: key,
    queryFn: async () =>
      await httpGet<TResponse>(fetchParams.url, fetchParams.params),
    ...options,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
