import axios from "axios";
import { get } from "lodash";
import { type AxiosError, type AxiosRequestConfig, HttpStatusCode } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

// import { ApiError } from "./ApiError";
import { readToken } from "~/services/localStorage.service";
import { doLogout } from '~/store/slices/authSlice';

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

httpApi.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${readToken()}`,
  };

  return config;
});

// httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
//   throw new ApiError<ApiErrorData>(
//     error.response?.data.message || error.message,
//     error.response?.data,
//   );
// });

export interface ApiErrorData {
  message: string;
}

//========
// Redux toolkit base query
//========
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'get', data, params, headers }, api) => {
    try {
      const result = await httpApi({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      const error_status: any = get(err, "response.status", HttpStatusCode.BadRequest);
      const error_message = get(err, "response?.data?.detail", err.message);
      if ([HttpStatusCode.Forbidden, HttpStatusCode.Unauthorized].includes(error_status)) {
        api.dispatch(doLogout());
      }
      return {
        error: {
          status: error_status,
          data: error_message,
        },
      };
    }
  };
