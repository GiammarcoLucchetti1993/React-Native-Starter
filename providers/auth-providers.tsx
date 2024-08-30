import useSecureStore from "@/hook/useSecureStore";
import { getCurrentUser, loginUser, logoutUser } from "@/lib/fetchers/users";
import { User } from "@/lib/types/user";
import { router } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  session: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export default function AuthProvieder({ children }: PropsWithChildren) {
  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { save, getValueFor, removeValueFor } = useSecureStore();

  useEffect(() => {
    const fetchSession = async () => {
      const refreshToken = await getValueFor("refreshToken");
      if (refreshToken) {
        const me = await getCurrentUser();
        setSession(me);
        setLoading(false);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password);
      console.log("la mia result", result);
      if (result && result.access_token && result.refresh_token) {
        await save("accessToken", result.access_token);
        await save("refreshToken", result.refresh_token);
        setSession(await getCurrentUser());
        router.replace("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    setSession(null);
    const refreshToken = await getValueFor("refreshToken");
    if (refreshToken) await logoutUser(refreshToken);
    removeValueFor("accessToken");
    removeValueFor("refreshToken");
    router.replace("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
