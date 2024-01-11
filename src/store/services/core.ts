import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "~/constants";
import { objectToQueryParams } from "~/utils";

interface ModelByIdQuery {
  model_id: number | string;
  params: string | string[][] | null;
}

// Define a service using a base URL and expected endpoints
export const coreApi = createApi({
  reducerPath: "coreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ENDPOINT}core/`,
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getConditions: builder.mutation<any, any>({
      query: (params: string | string[][] | null) => `conditions/${objectToQueryParams(params)}`,
    }),
    getModel: builder.query<any, any>({
      query: (params: string | string[][] | null) => `model/${objectToQueryParams(params)}`,
    }),
    getModelById: builder.query<any, any>({
      query: (query: ModelByIdQuery) => `model/${query.model_id}/${objectToQueryParams(query.params)}`,
    }),
    getPapers: builder.mutation<any, any>({
      query: (params: string | string[][] | null) => `papers/${objectToQueryParams(params)}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetConditionsMutation,
  useGetModelQuery,
  useGetModelByIdQuery,
  useGetPapersMutation,
} = coreApi;
