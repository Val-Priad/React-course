import type React from "react";
import { AuthContext, type TUser } from "./AuthContext";
import { useState } from "react";
import { FAKE_USER } from "../Config";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TUser | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function login(email: string, password: string) {
    if (email !== FAKE_USER.email || password !== FAKE_USER.password) {
      return;
    }

    setUser(FAKE_USER);
    setIsAuthenticated(true);
  }

  function logout() {
    setUser(undefined);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
