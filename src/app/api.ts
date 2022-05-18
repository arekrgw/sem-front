import axios from "axios";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

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

const userProfileAtom = atom<User | null>(null);
const isUserProfileLoading = atom(true);

const useUser = () => {
  const [user, setUser] = useAtom(userProfileAtom);
  const [isLoading, setIsLoading] = useAtom(isUserProfileLoading);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get<User>("/auth/profile");
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { user, isLoading, fetchProfile };
};

export { API, getToken, setToken, removeToken, userProfileAtom, useUser };

