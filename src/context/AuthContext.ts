import { createContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  loginToken: string | null;
  username: string | null;
  email: string | null;
  isAuthReady: boolean;
  login: (token: string, username: string, email: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loginToken: null,
  username: null,
  email: null,
  isAuthReady: false,
  login: () => {},
  logout: () => {},
});
