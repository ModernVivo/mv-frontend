import { type UserModel } from "~/types/auth";

const testUser = {
  id: 1,
  firstName: "Chris",
  lastName: "Johnson",
  userName: "@john1989",
  email: "chris.johnson@altence.com"
};

const ISSERVER = typeof window === "undefined";
const LOCAL_STORE_SUBFIX = "_MV_"

const accessTokenKey = `${LOCAL_STORE_SUBFIX}accessToken`
const userKey = `${LOCAL_STORE_SUBFIX}user`

export const persistToken = (token: string): void => {
  !ISSERVER && localStorage.setItem(accessTokenKey, token);
};

export const readToken = (): string => {
  return !ISSERVER && localStorage.getItem(accessTokenKey);
};

export const persistUser = (user: UserModel): void => {
  !ISSERVER && localStorage.setItem(userKey, JSON.stringify(user));
};

export const readUser = (): UserModel | null => {
  const userStr = !ISSERVER && localStorage.getItem(userKey);

  return userStr ? JSON.parse(userStr) : null;
};

export const deleteToken = (): void => localStorage.removeItem(accessTokenKey);
export const deleteUser = (): void => localStorage.removeItem(userKey);
