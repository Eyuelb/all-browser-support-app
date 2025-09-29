import { getQueryClient } from "@/providers/queryClient.client";
import { httpDelete, httpPost, httpPut } from "@/utils/axios/services";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

interface MutationParams<TArgs> {
  url: string | ((args: TArgs) => string);
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: TArgs;
  headers?: HeadersInit;
}
interface UseMutationParams<TResponse, TArgs> {
  mutationParams: MutationParams<TArgs>;
  invalidateTags?: QueryKey;
  options?: UseMutationOptions<TResponse, unknown, TArgs, unknown>;
}

export function useMutationQuery<TResponse, TArgs>({
  mutationParams,
  invalidateTags,
  options,
}: UseMutationParams<TResponse, TArgs>) {
  return useMutation<TResponse, unknown, TArgs>({
    mutationFn: async (body) => {
      const url = typeof mutationParams.url === 'function'
        ? mutationParams.url(body)
        : mutationParams.url;

      if (mutationParams.method === "PUT")
        return await httpPut<TResponse, TArgs>(url, body);
      if (mutationParams.method === "DELETE")
        return await httpDelete<TResponse>(url);
      return await httpPost<TResponse, TArgs>(url, body);
    },
    ...options,
    onSuccess: (data: TResponse, variables: TArgs, context: unknown) => {
      if (invalidateTags) {
        getQueryClient.invalidateQueries({
          queryKey: invalidateTags as QueryKey,
        });
      }

      if (options?.onSuccess) options?.onSuccess(data, variables, context);
    },
  });
}
