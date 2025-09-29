import { AxiosError } from "axios";
import { api } from "./base-query";

export async function httpGet<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  try {
    const response = await api.get(url, { params });
    //  console.log(response)
    return response.data as T;
  } catch (error) {
    const err = error as AxiosError;
    throw {
      status: err.response?.status,
      data: err.response?.data,
      method: err.response?.config.method,
      url: err.response?.config.url,
    };
  }
}

export async function httpPost<TResponse, TRequest>(
  url: string,
  options?: TRequest
): Promise<TResponse> {
  try {
    const response = await api.post(url, options);
    return response.data as TResponse;
  } catch (error) {
    const err = error as AxiosError;
    const errorData =
      (err.response?.data as {
        apierror: {
          message: string;
        };
      }) || null;
    throw {
      status: err.response?.status,
      data: err.response?.data,
      method: err.response?.config.method,
      url: err.response?.config.url,
      message:
        errorData.apierror && errorData.apierror.message
          ? errorData.apierror.message
          : null,
    };
    // console.error(error)
  }
}
export async function httpPut<TResponse, TRequest>(
  url: string,
  options?: TRequest
): Promise<TResponse> {
  try {
    const response = await api.put(url, options);
    return response.data as TResponse;
  } catch (error) {
    const err = error as AxiosError;
    throw {
      status: err.response?.status,
      data: err.response?.data,
      method: err.response?.config.method,
      url: err.response?.config.url,
    };
    // console.error(error)
  }
}

export async function httpDelete<TResponse>(url: string): Promise<TResponse> {
  try {
    const response = await api.delete(url);
    return response.data as TResponse;
  } catch (error) {
    const err = error as AxiosError;
    throw {
      status: err.response?.status,
      data: err.response?.data,
      method: err.response?.config.method,
      url: err.response?.config.url,
    };
    // console.error(error)
  }
}

export async function httpDynamicRequest<TResponse, TRequest>(
  url: string,
  method: "GET" | "POST",
  options?: TRequest
): Promise<TResponse> {
  try {
    if (method === "POST") {
      const response = await httpPost<TResponse, TRequest>(url, options);
      return response as TResponse;
    }
    const response = await httpGet<TResponse>(url);
    return response as TResponse;
  } catch (error) {
    const err = error as AxiosError;
    const errorData =
      (err.response?.data as {
        apierror: {
          message: string;
        };
      }) || null;
    throw {
      status: err.response?.status,
      data: err.response?.data,
      method: err.response?.config.method,
      url: err.response?.config.url,
      message:
        errorData.apierror && errorData.apierror.message
          ? errorData.apierror.message
          : null,
    };
    // console.error(error)
  }
}
