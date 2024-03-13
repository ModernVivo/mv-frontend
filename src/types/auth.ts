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
