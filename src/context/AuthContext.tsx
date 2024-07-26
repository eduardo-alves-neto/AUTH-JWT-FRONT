import React, { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  authToken: string | null;
  setAuthToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authToken: null,
  setAuthToken: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
