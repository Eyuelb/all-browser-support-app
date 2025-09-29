import { getSession } from "@/lib/auth/auth.service";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { httpPost } from "./services";
import { JWT } from "@/lib/auth/auth.model";
import envConfig from "@/config/dotenv";
const axiosBaseQuery = () => {
  const instance = axios.create({
    baseURL: envConfig.SERVER_BASE_URL,
  });

  instance.interceptors.request.use(
    async (request) => {
      if (request.url?.includes("/set-user-session")) return request;
      if (request.url?.includes("/auth") && !request.url?.includes("/auth/profile")) return request;

      const session = await getSession();
      if (session) {
        let accessToken = `Bearer ${session?.token?.access_token}`;
        const refreshToken = `${session?.token?.access_token}`;

        const decoded = jwtDecode<{ exp: number }>(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp <= currentTime) {
          const res = await httpPost<JWT, unknown>(
            `http://localhost:3000/api/set-user-session`,
            {
              refresh_token: refreshToken,
            },
          );
          if (res?.access_token) {
            accessToken = `Bearer ${res?.access_token}`;
          }

        }
        request.headers.Authorization = accessToken;
        instance.defaults.headers.common.Authorization = accessToken;
      }
      return request;
    },
    (axiosError) => {
      const err = axiosError as AxiosError;
      console.error({ AcErr: err });

      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    },
  );

  return instance;
};
export const api = axiosBaseQuery();
