export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  user: UserModel;
}

export interface SignUpRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  access: string;
  user: UserModel;
}
