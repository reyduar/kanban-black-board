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

  const createEntry = async (name: string) => {
    const newEntry = {
      name,
      description:
        "UI ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.",
      subtasks: [],
      label: "UI",
    };

    const { data } = await entriesApi.post<Entry>("entries", newEntry);
    dispatch({ type: "[Entry] Create-Entry", payload: data });
  };

  const updateEntry = async ({
    _id,
    name,
    description,
    subtasks,
    label,
    status,
  }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`entries/${_id}`, {
        name,
        description,
        subtasks,
        label,
        status,
      });
      dispatch({ type: "[Entry] Update-Entry", payload: data });
    } catch (error) {
      console.error(error);
    }
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
    const { data } = await entriesApi.get<Entry[]>("entries");
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
