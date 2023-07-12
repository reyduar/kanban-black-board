import { createContext } from "react";
import { Entry } from "@/kanban/interfaces";

interface ContextProps {
  isDragging: boolean;
  visibleModalEntry: boolean;
  entries: Entry[];

  // Methods
  createEntry: (name: string) => void;
  updateEntry: (entry: Entry) => void;
  showModalEntry: () => void;
  closeModalEntry: () => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const EntriesContext = createContext({} as ContextProps);
