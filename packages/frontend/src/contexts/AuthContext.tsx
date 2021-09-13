import { useState } from "react";
import { ReactNode, createContext, useContext } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";

import { api } from "../services/api";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/toast";

interface AuthProviderProps {
  children: ReactNode;
}

type FormData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
};

interface AuthContextData {
  signin: (formData: FormData) => Promise<void>;
  signout: () => Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

export async function signout() {
  destroyCookie(undefined, "dash.money.auth");
  await Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const toast = useToast();

  async function signin(formData: FormData) {
    try {
      const { data } = await api.post("/auth/signin", formData);

      setCookie(undefined, "dash.money.auth", data.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/",
      });

      api.defaults.headers["authorization"] = `Bearer ${data.token}`;

      setUser({ email: data.user.email, name: data.user.name });

      Router.push("/");
    } catch (err) {
      toast({
        title: "Usuário ou Senha incorreto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    const { ["dash.money.auth"]: token } = parseCookies(undefined);

    if (token) {
      api.defaults.headers["authorization"] = `Bearer ${token}`;

      api
        .get<{ user: User }>("/auth/me")
        .then(({ data }) => {
          setUser({ email: data.user.email, name: data.user.name });
        })
        .catch((err) => {
          console.log(err);
          signout();
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signin, signout, user, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
