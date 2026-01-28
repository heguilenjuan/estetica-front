import type { User } from "../models/user.model";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }
  | { type: "REFRESH_SESSION"; payload: User };
