import { createContext } from "react";
import { AuthResponse, User } from "../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: User;

  loginUser: (email: string, password: string) => Promise<AuthResponse>;
  createUser: (
    name: string,
    email: string,
    password: string,
    repeatedPassword: string
  ) => Promise<AuthResponse>;
}

export const AuthContext = createContext({} as ContextProps);
