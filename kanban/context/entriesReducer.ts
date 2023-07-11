import { EntriesState } from ".";

type EntriesActionType =
  | { type: " Entries - Open Sidebar" }
  | { type: " Entries - Close Sidebar" };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case " Entries - Open Sidebar":
      return { ...state };
    case " Entries - Close Sidebar":
      return { ...state };
    default:
      return state;
  }
};
