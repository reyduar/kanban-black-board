import { createContext } from "react";
import { Entry } from "@/kanban/interfaces";

interface ContextProps {
  entries: Entry[];
}

export const EntriesContext = createContext({} as ContextProps);
