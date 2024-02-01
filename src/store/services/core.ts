import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "~/constants";
import { objectToQueryParams } from "~/utils";
import { axiosBaseQuery } from "~/api/http.api";

interface ModelByIdQuery {
  model_id: number | string;
  params: string | string[][] | null;
}

// Define a service using a base URL and expected endpoints
export const coreApi = createApi({
  reducerPath: "coreApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_ENDPOINT}core/`,
  }),
  endpoints: (builder) => {
    return {
      getConditions: builder.mutation<any, any>({
        query: (params: string | string[][] | null) => ({
          url: `conditions/${objectToQueryParams(params)}`,
        }),
      }),
      getConditionsValues: builder.mutation<any, any>({
        query: (params: string | string[][] | null) => ({
          url: `conditions/values/${objectToQueryParams(params)}`,
        }),
      }),
      getModel: builder.query<any, any>({
        query: (params: string | string[][] | null) => ({
          url: `model/${objectToQueryParams(params)}`,
        }),
      }),
      getModelById: builder.mutation<any, any>({
        query: (query: ModelByIdQuery) => ({
          url: `model/${query.model_id}/${objectToQueryParams(query.params)}`,
        }),
      }),
      getPapers: builder.mutation<any, any>({
        query: (params: string | string[][] | null) => ({
          url: `papers/${objectToQueryParams(params)}`,
        }),
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetConditionsMutation,
  useGetConditionsValuesMutation,
  useGetModelQuery,
  useGetModelByIdMutation,
  useGetPapersMutation,
} = coreApi;
