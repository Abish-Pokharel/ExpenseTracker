import { useEffect, useMemo, useState } from "react";
import { getUser, login, register } from "../services/authService";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const bootstrapSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getUser();
        setUser(response?.data || null);
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrapSession();
  }, [token]);

  const loginUser = async (credentials) => {
    const response = await login(credentials);
    if (response?.accessToken) {
      localStorage.setItem("token", response.accessToken);
      setToken(response.accessToken);
      setUser(response?.data || null);
    }
    return response;
  };

  const registerUser = async (credentials) => {
    const response = await register(credentials);
    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      loginUser,
      registerUser,
      logout,
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}