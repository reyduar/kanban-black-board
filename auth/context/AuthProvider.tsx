import { useReducer, ReactNode, useEffect } from "react";
import { AuthContext, authReducer } from "./";
import { AuthResponse, User } from "../interfaces";
import { userApi } from "@/services";
import Cookies from "js-cookie";
import axios from "axios";

export interface AuthState {
  isLoggedIn: boolean;
  user?: User;
}

type ChildContainerProps = {
  children: ReactNode;
};

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }: ChildContainerProps) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const { data } = await userApi.get("/validate-token");
      const { _, user } = data;
      dispatch({ type: "[Auth] Login", payload: user });
    } catch (error) {
      Cookies.remove("kbtoken");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const { data } = await userApi.post("/login", { email, password });
      const { token, user } = data;
      Cookies.set("kbtoken", token);
      dispatch({ type: "[Auth] Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      let message = "An unexpected error occurred.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message;
      }
      return {
        hasError: true,
        message,
      };
    }
  };

  const createUser = async (
    name: string,
    email: string,
    password: string,
    repeatedPassword: string
  ): Promise<AuthResponse> => {
    try {
      const { data } = await userApi.post("/", {
        name,
        email,
        password,
        repeatedPassword,
      });

      return {
        hasError: false,
      };
    } catch (error) {
      let message = "An unexpected error occurred.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data.message;
      }
      return {
        hasError: true,
        message,
      };
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, createUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
