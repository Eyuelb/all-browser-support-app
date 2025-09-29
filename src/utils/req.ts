import envConfig from "@/config/dotenv";

export const getBaseUrl = (path: string) => {
  return `${envConfig.SERVER_BASE_URL}${path}`;
};

console.log({ url: getBaseUrl('/8596'), u: envConfig.SERVER_BASE_URL })