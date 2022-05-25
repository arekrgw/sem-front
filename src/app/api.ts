import axios from "axios";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import jwtDecode from "jwt-decode";

const tokenName = "token";

const setToken = (token: string) => {
  localStorage.setItem(tokenName, token);
};

const getToken = () => {
  return localStorage.getItem(tokenName);
};

const removeToken = () => {
  localStorage.removeItem(tokenName);
};

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((config) => {
  const token = getToken();
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});

const decodedToken: () => Profile | null = () => {
  const token = getToken();
  if (token) return jwtDecode<Profile>(token);
  return null;
};

const userProfileAtom = atom<Profile | null>(decodedToken());

const useUser = () => {
  const [user, setUser] = useAtom(userProfileAtom);
  console.log(user);
  const restoreProfile = useCallback(() => {
    const user = decodedToken();
    if (user) {
      setUser(user);
    }
  }, [setUser]);

  const removeUser = useCallback(() => {
    setUser(null);
    removeToken();
  }, [setUser]);

  return { user, restoreProfile, removeUser };
};

export { API, getToken, setToken, removeToken, userProfileAtom, useUser };
