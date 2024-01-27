import { httpApi } from "./http.api";
import { type LoginRequest, type LoginResponse } from "~/types/auth";
import { API_ENDPOINT } from "~/constants";

export const login = (loginPayload: LoginRequest): Promise<LoginResponse> =>
  httpApi
    .post<LoginResponse>(`${API_ENDPOINT}auth/login/`, { ...loginPayload })
    .then(({ data }) => data);
