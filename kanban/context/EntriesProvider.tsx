import { useReducer } from "react";
import { v4 as uuid } from "uuid";
import { EntriesContext, entriesReducer } from "./";
import { ChildContainerProps } from "@/types/types";
import { Entry } from "@/kanban/interfaces";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuid(),
      name: "Task 1",
      descriptions: [
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 1" },
      ],
      createdAt: Date.now(),
      status: "pending",
      label: "UI",
    },
    {
      _id: uuid(),
      name: "Task 2",
      descriptions: [
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 1" },
      ],
      createdAt: Date.now() - 1000000,
      status: "in-progress",
      label: "Backend",
    },
    {
      _id: uuid(),
      name: "Task 3",
      descriptions: [
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 1" },
      ],
      createdAt: Date.now() - 1000000,
      status: "finished",
      label: "Design",
    },
  ],
};

export const EntriesProvider = ({ children }: ChildContainerProps) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  return (
    <EntriesContext.Provider value={{ ...state }}>
      {children}
    </EntriesContext.Provider>
  );
};
