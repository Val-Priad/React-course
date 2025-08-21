import { createContext, useContext } from "react";

export type TUser = {
  name: string;
  avatar: string;
  email: string;
  password: string;
};

export type TAuthContext = {
  user: TUser | undefined;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("`useAuth` must be used only within AuthProvider");
  }

  return context;
}
