import { useState, type ReactNode, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../api/axiosInstance";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginToken, setLoginToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // JWT exp 체크 함수
  const isTokenExpired = (token: string) => {
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  };

  // 앱 시작 시 localStorage에서 인증 복원
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("username");
    if (token && !isTokenExpired(token) && savedUser) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setIsLoggedIn(true);
      setLoginToken(token);
      setUsername(savedUser);
    }

    setIsAuthReady(true); // 초기 인증 체크 완료
  }, []);

  const login = (token: string, username: string, email: string | null) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setEmail(email);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setIsLoggedIn(true);
    setLoginToken(token);
    setUsername(username);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error(e);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setLoginToken(null);
    setUsername(null);

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loginToken,
        username,
        email,
        isAuthReady,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
