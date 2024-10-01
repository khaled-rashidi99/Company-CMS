import React, { createContext, useState, useContext, ReactNode } from "react";
import getIsAuthenticated, { setIsAuthenticated } from "./services/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(getIsAuthenticated());

  const login = () => {
    setIsLoggedIn(true);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
