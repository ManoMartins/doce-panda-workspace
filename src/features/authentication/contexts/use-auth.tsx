import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useError } from "@hooks/use-error";

import api from "@services/api";
import { useNavigate } from "react-router";
import {
  InputSignIn,
  signInUser,
} from "@features/authentication/services/use-sign-in";

interface User {
  id: string;
  name: string;
}

interface AuthContextValues {
  isLoading: boolean;
  isLogged: boolean;
  user: User | undefined;
  logout: () => void;
  login: (input: InputSignIn) => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

const STORAGE_KEYS = {
  USER: "@dp:user",
  TOKEN: "@dp:token",
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { handle } = useError();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const saveUserToStorage = useCallback((input: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(input));
  }, []);

  const saveTokenToStorage = useCallback((token: string) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }, []);

  const loadUserFromStorage = useCallback(() => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return undefined;
    return JSON.parse(userStr);
  }, []);

  const loadTokenFromStorage = useCallback(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) return null;
    return token;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);

    setUser(undefined);
    api.defaults.headers.common.Authorization = "";
    navigate("/sign-in");
  }, []);

  const login = useCallback(
    async (input: InputSignIn) => {
      try {
        setIsLoading(true);
        const data = await signInUser(input);

        const userData = {
          id: data.user.id,
          name: data.user.name,
        };

        api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        setUser(userData);

        saveUserToStorage(userData);
        saveTokenToStorage(data.token);

        navigate("/");
      } catch (err) {
        handle(err);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const token = loadTokenFromStorage();
    const loadedUser = loadUserFromStorage();

    if (token && loadedUser) {
      setUser(loadedUser);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    setIsLoading(false);
  }, [loadTokenFromStorage, loadUserFromStorage]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isLogged: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
