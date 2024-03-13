import { httpApi } from "./http.api";
import type { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from "~/types/auth";
import { API_ENDPOINT } from "~/constants";

export const login = (loginPayload: LoginRequest): Promise<LoginResponse> =>
  httpApi
    .post<LoginResponse>(`${API_ENDPOINT}auth/login/`, { ...loginPayload })
    .then(({ data }) => data);

export const signup = (payload: SignUpRequest): Promise<SignUpResponse> =>
  httpApi
    .post<SignUpResponse>(`${API_ENDPOINT}auth/sign-up/`, { ...payload })
    .then(({ data }) => data);
