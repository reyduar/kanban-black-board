import { useEffect, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { EntriesContext, entriesReducer } from "./";
import { ChildContainerProps } from "@/types/types";
import { Entry } from "@/kanban/interfaces";
import { entriesApi } from "@/services";

export interface EntriesState {
  isDragging: boolean;
  visibleModalEntry: boolean;
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  isDragging: false,
  visibleModalEntry: false,
  entries: [],
};

export const EntriesProvider = ({ children }: ChildContainerProps) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const createEntry = (name: string) => {
    const newEntry: Entry = {
      _id: uuid(),
      name,
      description:
        "UI ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.",
      subtasks: [
        { _id: uuid(), description: "Subtask 1" },
        { _id: uuid(), description: "Subtask 2" },
        { _id: uuid(), description: "Subtask 3" },
      ],
      label: "UI",
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "[Entry] Create-Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] Update-Entry", payload: entry });
  };

  const showModalEntry = () => {
    dispatch({ type: "[Entry] Show-Modal" });
  };

  const closeModalEntry = () => {
    dispatch({ type: "[Entry] Close-Modal" });
  };

  const startDragging = () => {
    dispatch({ type: "[Entry] Start-Dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "[Entry] End-Dragging" });
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Load-Entries", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        createEntry,
        updateEntry,
        showModalEntry,
        closeModalEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
